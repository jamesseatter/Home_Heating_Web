import { Component, Input } from '@angular/core';
import { DataService } from '../data/data.service';
export var TemperatureAlertComponent = (function () {
    function TemperatureAlertComponent(dataService) {
        this.dataService = dataService;
        this.queryDays = '1';
    }
    TemperatureAlertComponent.prototype.ngOnInit = function () {
        this.getAlertData();
    };
    TemperatureAlertComponent.prototype.ngOnChanges = function (changes) {
        for (var _propName in changes) {
            if (_propName === 'queryDays') {
                console.log('queryDays changed to ' + JSON.stringify(changes[_propName].currentValue));
            }
        }
    };
    TemperatureAlertComponent.prototype.getAlertData = function () {
        var _this = this;
        this.dataService.getAlertData()
            .subscribe(function (data) { _this.extractTemperatureData(data); console.log('Recieved Alert data in component'); }, function (err) { _this.errorMessage = 'Failed to load chart data'; });
    };
    TemperatureAlertComponent.prototype.extractTemperatureData = function (jsonTemperatureData) {
        // TODO Cleanup
        console.log(jsonTemperatureData);
        var _localData = [];
        this.tempData = [];
        // Ensure we have a JSON string
        var d2 = JSON.parse(JSON.stringify(jsonTemperatureData));
        // Split the JSON into two arrays, one for xAxis and one for yAxin(note, merge Temperature and LowTemperature together from JSON stream)
        for (var iRow = 0; iRow < d2.rows.length; iRow++) {
            _localData.push(Array(d2.rows[iRow].c[0].v, d2.rows[iRow].c[1].v));
        }
        this.tempData = _localData;
    };
    TemperatureAlertComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-temperature-alert',
                    templateUrl: './temperature-alert.component.html',
                    styleUrls: ['./temperature-alert.component.css']
                },] },
    ];
    /** @nocollapse */
    TemperatureAlertComponent.ctorParameters = [
        { type: DataService, },
    ];
    TemperatureAlertComponent.propDecorators = {
        'queryDays': [{ type: Input },],
    };
    return TemperatureAlertComponent;
}());
//# sourceMappingURL=temperature-alert.component.js.map