import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataAlertService } from './data-alert/data-alert.service';

import { Alert } from './Alert.model';    // class
import { DayHistory  } from './Alert.model';    // interface

@Component({
  selector: 'app-alerthistory',
  templateUrl: './alerthistory.component.html',
  styleUrls: ['./alerthistory.component.css']
})
export class AlerthistoryComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public alertData = [];
  public alertData2: Alert[] = [];
  public dataHistoryOptions: DayHistory[];
  public queryDays: string;
  public errorMessage: string;
  public pageElementStatus = {
      htmlShowAlertTable: true,
      htmlShowErrorMessage: false
    };

  constructor(private dataService: DataAlertService) { }

  ngOnInit() {
    this.setHistoryPicker();
    this.dataService.loadData(this.queryDays);
    this.dataService.loadData(this.queryDays);
    this.getAlertData();
  }

  ngOnDestroy(): void {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  private getAlertData(): void {
    this.subscription = this.dataService.alerts$
      .subscribe(
        data => {
          if (data.length > 0) {
            this.extractData(data);
            console.log('AlertHistory: Recieved alert data.');
          }
        },
        err => { this.errorMessage = 'AlertHistory: Failed to load alert data.'; }
      );
  }

  private extractData(jsonTemperatureData: any): void {
    // TODO Cleanup
    console.log(jsonTemperatureData);
    const _localData = [];
    this.alertData = [];
    this.alertData2 = [];

    // Ensure we have a JSON string
    const d2 = JSON.parse(JSON.stringify(jsonTemperatureData));

    // Split the JSON into an array format
    for (let iRow = 0; iRow < d2.length; iRow++) {
        this.alertData.push (Array(d2[iRow].Date, d2[iRow].Temperature, d2[iRow].Cleared, d2[iRow].ClearedDate));
        // this.alertData2.push( d2[iRow].Date, d2[iRow].Temperature, d2[iRow].Cleared, d2[iRow].ClearedDate );
        this.alertData2.push ({Date: d2[iRow].Date
                              , Temperature: Number (d2[iRow].Temperature)
                              , Cleared: d2[iRow].Cleared
                              , ClearedDate: d2[iRow].ClearedDate});
    }
    // this.alertData = _localData;
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

  public onSelectDayRange(days: any): void {
    console.log('Dashboard: Day range changed, refreshing data');
    this.queryDays = days.toString();
    this.dataService.loadData(this.queryDays);
  }

  public onErrorMessage(event) {
    this.errorMessage = event.errorMessage;
    this.pageElementStatus.htmlShowErrorMessage = true;
  }

  public onRefreshData(): void {
    console.log('Dashboard: Refreshing data');
    this.dataService.loadData(this.queryDays);
  }
}
