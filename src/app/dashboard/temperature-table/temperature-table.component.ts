import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService, ITemperatureData } from '../../data.service';

@Component({
  selector: 'app-temperature-table',
  templateUrl: './temperature-table.component.html',
  styleUrls: ['./temperature-table.component.css']
})


export class TemperatureTableComponent implements OnInit {
  @Output() errorMessage = new EventEmitter();
  error: any;

  public temperatures: ITemperatureData[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.temperatures.subscribe((data: ITemperatureData[]) => {
        console.log('TemperatureTable: Received temperature data : ' + data.length + ' rows');
        // this.extractData(data);
        this.temperatures = data;
    },
        err  => { this.errorMessage.emit({errorMessage: 'TemperatureChart: Failed to load temperature data.'});
    });
  }
}
