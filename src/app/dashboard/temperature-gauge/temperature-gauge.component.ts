import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService, ITemperatureData } from '../../data.service';
import { ConfigService } from '../../config/config.service';

import 'highcharts/highcharts-more';
import 'highcharts/modules/solid-gauge';

declare var jQuery: any;

@Component({
  selector: 'app-temperature-gauge',
  templateUrl: './temperature-gauge.component.html',
  styleUrls: ['./temperature-gauge.component.css']
})

export class TemperatureGaugeComponent implements OnInit {
  @Output() errorMessage = new EventEmitter();
  private currentTemperature;

  constructor(private dataService: DataService, private configService: ConfigService) { }

  ngOnInit(): void {
    this.dataService.lastTemperature.subscribe((data: ITemperatureData) => {
      if (data) {
        this.currentTemperature = data.temperature;
        console.log('TemperatureGauge: Received temperature data');
        this.renderChart();
      }
    },
        err  => { this.errorMessage.emit({ errorMessage: 'TemperatureGauge: Failed to load temperature data.' });
      });
  }


  private renderChart() {
    jQuery('#currentTempGaugeContainer').highcharts( {
        chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: {
          text: 'Temperature'
        },
        pane: {
          startAngle: -150,
          endAngle: 150,
          background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
            }, {
              backgroundColor: {
                  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                  stops: [
                      [0, '#333'],
                      [1, '#FFF']
                  ]
              },
            borderWidth: 1,
            outerRadius: '107%'
            }, {
            // default background
            }, {
              backgroundColor: '#DDD',
              borderWidth: 0,
              outerRadius: '105%',
              innerRadius: '103%'
          }]
        },
        // the value axis
        yAxis: {
          min: 0,
          max: 100,
          minorTickInterval: 'auto',
          minorTickWidth: 1,
          minorTickLength: 10,
          minorTickPosition: 'inside',
          minorTickColor: '#666',
          tickPixelInterval: 30,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 10,
          tickColor: '#666',
          labels: {
            step: 2,
            rotation: 'auto'
          },
            title: {
              text: 'C'
            },
            plotBands: [{
                from: 0,
                to: 55,
                color: '#DF5353' // red, too cold
              }, {
                from: 55,
                to:   75,
                color: '#55BF3B' // green
              }, {
                from: 75,
                to: 160,
                color: '#DF5353' // red, too hot
            }]
        },
        series: [{
          name: 'Temperature',
          data: [this.currentTemperature],
          tooltip: {
            valueSuffix: ' C'
          }
        }]
    });
  }

}
