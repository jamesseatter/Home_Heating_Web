import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../data/data.service';
export var TemperatureChartComponent = (function () {
    function TemperatureChartComponent(dataService) {
        this.dataService = dataService;
        this.queryDays = '1';
        this.lowTempThreshold = 55;
        this.lowTemperatureDetected = new EventEmitter();
        this.latestTemperature = new EventEmitter();
        this.xAxis = [];
        this.yAxis = [];
    }
    TemperatureChartComponent.prototype.ngOnInit = function () {
    };
    TemperatureChartComponent.prototype.ngOnChanges = function (changes) {
        for (var propName in changes) {
            if (propName === 'queryDays') {
                console.log('queryDays changed to ' + JSON.stringify(changes[propName].currentValue));
                this.getTemperatureData();
            }
        }
    };
    TemperatureChartComponent.prototype.getTemperatureData = function () {
        var _this = this;
        this.dataService.getTemperatureData(this.queryDays)
            .subscribe(function (data) { _this.extractTemperatureData(data); console.log('Recieved temperature data in chart component'); }, function (err) { _this.errorMessage = 'Failed to load chart data'; });
    };
    TemperatureChartComponent.prototype.extractTemperatureData = function (jsonTemperatureData) {
        console.log(jsonTemperatureData);
        var _xAxis = [];
        var _yaxis = [];
        var _lowTempDet = false;
        // Ensure we have a JSON string
        var _d2 = JSON.parse(JSON.stringify(jsonTemperatureData));
        // Split the JSON into two arrays, one for xAxis and one for yAxin(note, merge Temperature and LowTemperature together from JSON stream)
        for (var iRow = 0; iRow < _d2.rows.length; iRow++) {
            _xAxis.push(new Date(_d2.rows[iRow].c[0].v));
            if (_d2.rows[iRow].c.length < 3) {
                _yaxis.push(_d2.rows[iRow].c[1].v);
            }
            else {
                _yaxis.push(_d2.rows[iRow].c[2].v);
                _lowTempDet = _d2.rows[iRow].c[2].v;
            }
        }
        // get latest temperature
        this.latestTemperature.emit({
            temperature: _yaxis[_yaxis.length - 1]
        });
        // If low temp was detected send an event to the parent.
        if (_lowTempDet) {
            this.lowTemperatureDetected.emit({
                value: true
            });
        }
        this.xAxis = _xAxis;
        this.yAxis = _yaxis;
        this.renderChart();
    };
    TemperatureChartComponent.prototype.renderChart = function () {
        jQuery('#chartContainer').highcharts({
            chart: {
                type: 'spline'
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
                labels: {
                    rotation: -45,
                    align: 'right',
                    format: "{value:%d-%m-%Y %HH:%M}",
                },
                title: {
                    text: 'Date'
                }
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
                plotLines: [{
                        color: '#3498db',
                        width: 2,
                        value: 55,
                        dashStyle: 'longdashdot'
                    }],
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
                // pointFormat: '{point.x}<br/><b>{point.y:,.0f}</b>'
                pointFormat: '<b>{point.y:,.0f} = "C"</b>'
            },
            series: [{
                    name: 'Incoming Water',
                    // data: this.chartSeriesData,
                    data: this.yAxis,
                    zones: [{
                            value: this.lowTempThreshold,
                            color: '#c0392b'
                        }, {
                            value: 73,
                            color: '#27ae60'
                        }, {
                            value: 200,
                            color: '#d35400'
                        }]
                }],
            loading: {
                hideDuration: 1000,
                showDuration: 1000
            },
        });
    };
    // Temperature Gauge
    // public temp_GaugeData;
    // public temp_GaugeData=[
    //                       ['Label', 'Value'],
    //                       ['Temp', 65]
    //                       ];
    // public temp_GaugeOptions= {
    //             width: 400, height: 120,
    //             redFrom: 70, redTo: 100,
    //             yellowFrom: 0, yellowTo: 60,
    //             greenFrom: 60, greenTo: 70,
    //             minorTicks: 5,
    //             interpolateNulls: true
    //     };
    // getCurrentTemperature(): void {
    //   this.temp_GaugeData = this.dataService.getCurrentTemperature();
    // }
    TemperatureChartComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-temperature-chart',
                    templateUrl: './temperature-chart.component.html',
                    styleUrls: ['./temperature-chart.component.css']
                },] },
    ];
    /** @nocollapse */
    TemperatureChartComponent.ctorParameters = [
        { type: DataService, },
    ];
    TemperatureChartComponent.propDecorators = {
        'queryDays': [{ type: Input },],
        'lowTempThreshold': [{ type: Input },],
        'lowTemperatureDetected': [{ type: Output },],
        'latestTemperature': [{ type: Output },],
    };
    return TemperatureChartComponent;
}());
//# sourceMappingURL=temperature-chart.component.js.map