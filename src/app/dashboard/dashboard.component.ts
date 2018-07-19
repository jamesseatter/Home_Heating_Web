import { Component, NgModule, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { DataService, ITemperatureData } from '../data.service';

import { DayHistory } from './Temperature.model';


// Sub Components
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { TemperatureTableComponent } from './temperature-table/temperature-table.component';
import { TemperatureAlertComponent } from './temperature-alert/temperature-alert.component';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  private subscription: Subscription;
  public dataHistoryOptions: DayHistory[];
  public queryDays: string;
  public temperatureAlertThreshold = 55;  // todo replace with config service data
  public currentTemperature: number;  // Used for dashboard warning banner
  public errorMessage: string;
  public pageElementStatus = {
      htmlShowChartProgress: false,
      htmlShowTempChart: false,
      htmlShowTempTableRequest: false,
      htmlShowTempTable: false,
      htmlShowAlertTableRequest: false,
      htmlShowAlertTable: false,
      htmlShowTemperatureAlert: false,
      htmlShowErrorMessage: false,
      htmlShowTemperatureGauge: false
    };

  constructor(private dataService: DataService, private configService: ConfigService) { }

  ngOnInit() {
    this.configService.loadData();
    this.setHistoryPicker();
    this.getAllData();
  }

  private getDashboardData(): void {
    this.subscription = this.dataService.lastTemperature.subscribe((data: ITemperatureData) => {
          if (data) {
            console.log('Dashboard: Temperature Data load complete.');
            try {
              this.checkLowTemperatureCondition(data.temperature);
              this.pageElementStatus.htmlShowTempChart = true;
              // since we have the latest temperature we also have temperature data so show the table.
              this.pageElementStatus.htmlShowTempTableRequest = true;
              // Show the gauge
              this.pageElementStatus.htmlShowTemperatureGauge = true;
            } catch (e) {
              console.log('Dashboard: ERROR PROCESSING DATA, ' + e);
            }
          }
        },
        err => { this.errorMessage = 'Dashboard: Failed to load temperature data.'; }
       );
  }

  // Set the history Selector
  private setHistoryPicker() {
    this.dataHistoryOptions = [
      { id: '1', name: '1 day' },
      { id: '7', name: '7 days' },
      { id: '30', name: '30 days' },
      { id: '365', name: '365 days' }
    ];
    this.queryDays = '1';
  }

  public onRefreshData(): void {
    console.log('Dashboard: Refreshing data');
    this.getAllData();
  }

  public getAllData(): void {
    // Main data load for Dashboard
    this.dataService.loadTemperatures(this.queryDays);
    this.getDashboardData();
  }

  public onSelectDayRange(days: any): void {
    this.queryDays = days.toString();
    console.log('Dashboard: Day range changed to ' + this.queryDays + ', refreshing data');
    this.getAllData();
  }

  public onErrorMessage(event) {
    this.errorMessage = event.errorMessage;
    this.pageElementStatus.htmlShowErrorMessage = true;
  }

  public checkLowTemperatureCondition(data) {
    console.log('Dashboard: Process LowTemperature');
    if (data.length > 0) {
      this.currentTemperature = data[data.length - 1].Temperature;

      if (this.currentTemperature < Number(this.temperatureAlertThreshold)) {
        // Show page banner if the "current" water temperature is below trigger point.
        this.pageElementStatus.htmlShowAlertTableRequest = true;
        this.pageElementStatus.htmlShowTemperatureAlert = true;
      }
    }
  }
}
