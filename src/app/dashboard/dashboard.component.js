import { Component } from '@angular/core';
import { DataService } from '../data/data.service';
// @NgModule({
//   declarations: [ TemperatureChartComponent, TemperatureTableComponent, TemperatureAlertComponent ]
// })
export var DashboardComponent = (function () {
    function DashboardComponent(dataService) {
        this.dataService = dataService;
        this.title = 'PPE Temperature';
        this.temperatureAlertThreshold = 55;
        this.show_chart_progress = true;
        this.htmlShowTempChart = true;
        this.htmlShowTempTable = false;
        this.htmlShowAlertTable = false;
        this.htmlShowAlertTableRequest = false;
        this.htmlShowTemperatureAlert = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getconfig();
        this.setHistoryPicker();
    };
    // Set the history Selector
    DashboardComponent.prototype.setHistoryPicker = function () {
        this.dataHistoryOptions = [
            { id: '1', name: '1 day' },
            { id: '7', name: '7 days' },
            { id: '30', name: '30 days' },
            { id: '365', name: '365 days' }
        ];
        this.queryDays = '1';
    };
    DashboardComponent.prototype.onSelectDayRange = function (days) {
        var dayRange;
        dayRange = days.id;
        this.queryDays = days.toString();
    };
    DashboardComponent.prototype.onLowTemperatureAlert = function (event) {
        console.log(event.value);
        this.htmlShowAlertTableRequest = true;
    };
    DashboardComponent.prototype.onLatestTemperature = function (event) {
        console.log(event.temperature);
        this.latestTemperature = event.temperature;
        if (this.latestTemperature < this.temperatureAlertThreshold) {
            this.htmlShowTemperatureAlert = true;
        }
    };
    DashboardComponent.prototype.getconfig = function () {
        // let data:any = this.dataService.getConfigDataCurrent();
        // this.temperatureAlertThreshold = data.config.charttriggertemperature;
    };
    DashboardComponent.decorators = [
        { type: Component, args: [{
                    templateUrl: './dashboard.component.html',
                    styleUrls: ['./dashboard.component.css'],
                },] },
    ];
    /** @nocollapse */
    DashboardComponent.ctorParameters = [
        { type: DataService, },
    ];
    return DashboardComponent;
}());
//# sourceMappingURL=dashboard.component.js.map