import { Component, OnInit, OnDestroy, Output,  EventEmitter } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { DataService, ITemperatureData } from '../../data.service';

import * as moment from 'moment-timezone';

declare var jQuery: any;

@Component({
  selector: 'app-temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.css']
})

export class TemperatureChartComponent implements OnInit, OnDestroy {
    @Output() errorMessage = new EventEmitter();
    public temperatureAlertThreshold = 55;  // TODO replace with dataService values

    // HighCharts Axis Data from extractData
    public xAxis = [];
    public yAxis = [];

    public temperatures: ITemperatureData[];

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.dataService.temperatures.subscribe((data: ITemperatureData[]) => {
            console.log('TemperatureChart: Received temperature data : ' + data.length + ' rows');
            this.extractData(data);
            this.renderChart();
        },
            err  => { this.errorMessage.emit({errorMessage: 'TemperatureChart: Failed to load temperature data.'});
        });
    }

    ngOnDestroy() {
        this.dataService.temperatures.unsubscribe();
    }

    private extractData(jsonTemperatureData) {
        // Get client timezone
        const clientTz = moment.tz.guess();
        console.log('Time Zone : ' + clientTz);

        if (jsonTemperatureData.length > 0) {
            for (const temp of jsonTemperatureData) {
                const d = moment(temp.date).tz(clientTz).toString();
                // this.xAxis.push(new Date(moment(temp.date).tz(clientTz)));
                this.xAxis.push(new Date(d));
                this.yAxis.push(temp.temperature);
            }
        }
    }

    private renderChart() {
        jQuery('#tempChartContainer').highcharts( {
            chart: {
                type: 'spline',
                marginBottom: 155,
            },
            title: {
                text: 'PPE Water Temperature'
            },
            subtitle: {
                text: 'Source: Heat of water entering Villa 1'
            },
            xAxis: {
                categories: this.xAxis,
                type: 'datetime',
                reversed: false,
                labels: {
                    rotation: -45,
                    align: 'right',
                    format: '{value:%d-%m-%Y %HH:%M}',
                    style: {
                        fontSize: '10px'
                    }
                },
                title: {
                    text: 'Date'
                },
            },
            yAxis: {
                title: {
                    text: 'Temperature(C)'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                },
                plotLines: [
                    { // Add the alert cutoff threshold
                        color: '#c0392b',
                        width: 2,
                        value: 55,
                        dashStyle: 'longdashdot'
                    },
                    { // Add the alert cutoff threshold
                        color: '#FFA726',
                        width: 2,
                        value: 74,
                        dashStyle: 'longdashdot'
                    }
                ],
                tickInterval: 5,
                softMin: 30,
                softMax: 100
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                pointFormat: '<b>{point.y:,.0f} = "C"</b>'
            },
            credits: {
                text: 'The temperature data in this chart is as per the analogue temperature gauges in Villa 1.',
                position: {
                    align: 'center',
                    y: -5 // position of credits
                },
                style: {
                    fontSize: '8pt' // you can style it!
                }
            },
            series: [ {
                name: 'Incoming Water',
                data: this.yAxis,
                zones: [ {
                        value: this.temperatureAlertThreshold,
                        color: '#c0392b'
                    }, {
                        value: 73,
                        color: '#27ae60'
                    }, {
                        value: 200,
                        color: '#FFA726'
                } ]
            } ],
            loading: {
                hideDuration: 1000,
                showDuration: 1000
            }
        });
    }
}
