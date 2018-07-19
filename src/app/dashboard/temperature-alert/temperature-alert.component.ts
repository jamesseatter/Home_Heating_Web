import { Component, OnInit, Input, OnChanges, SimpleChange, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-temperature-alert',
  templateUrl: './temperature-alert.component.html',
  styleUrls: ['./temperature-alert.component.css']
})
export class TemperatureAlertComponent implements OnInit, OnDestroy {
  @Input() queryDays = '1';
  private errorMessage;
  private subscription: Subscription;
  private alertData = [];

  constructor(private dataService: DataService) {  }

  ngOnInit(): void {
    // this.getAlertData();
  }

  ngOnDestroy(): void {
    // prevent memory leak when component is destroyed
    // this.subscription.unsubscribe();
  }

  private getAlertData(): void {
    // this.subscription = this.dataService.alerts$
    //   .subscribe(
    //     data => {
    //       this.extractData(data);
    //       console.log('TemperatureAlert: Recieved alert data.');
    //     },
    //     err => { this.errorMessage.emit({ errorMessage: 'TemperatureAlert: Failed to load temperature data.' }); }
    //   )
  }

  private extractData(jsonTemperatureData: any): void {
    // // TODO Cleanup
    // console.log(jsonTemperatureData);
    // const _localData = [];
    // this.alertData = [];

    // // Ensure we have a JSON string
    // const d2 = JSON.parse(JSON.stringify(jsonTemperatureData));

    // // Split the JSON into an array format
    // for (let iRow = 0; iRow < d2.length; iRow++) {
    //     this.alertData.push(Array(d2[iRow].Date, d2[iRow].Temperature, d2[iRow].Cleared, d2[iRow].ClearedDate));
    // }
    // // this.alertData = _localData;
  }

}
