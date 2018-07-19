import { Component, Input } from '@angular/core';
import { DataService } from '../data/data.service';
export var TemperatureTableComponent = (function () {
    function TemperatureTableComponent(dataService) {
        this.dataService = dataService;
        this.queryDays = '1';
    }
    TemperatureTableComponent.prototype.ngOnInit = function () {
        this.getTemperatureData();
    };
    TemperatureTableComponent.prototype.ngOnChanges = function (changes) {
        for (var _propName in changes) {
            if (_propName === 'queryDays') {
                console.log('queryDays changed to ' + JSON.stringify(changes[_propName].currentValue));
            }
        }
    };
    TemperatureTableComponent.prototype.getTemperatureData = function () {
        var _this = this;
        this.dataService.getTemperatureDataCurrent()
            .subscribe(function (data) { _this.extractTemperatureData(data); console.log('Recieved temperature data in table component'); }, function (err) { _this.errorMessage = 'Failed to load chart data'; });
    };
    TemperatureTableComponent.prototype.extractTemperatureData = function (jsonTemperatureData) {
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
    TemperatureTableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-temperature-table',
                    templateUrl: './temperature-table.component.html',
                    styleUrls: ['./temperature-table.component.css']
                },] },
    ];
    /** @nocollapse */
    TemperatureTableComponent.ctorParameters = [
        { type: DataService, },
    ];
    TemperatureTableComponent.propDecorators = {
        'queryDays': [{ type: Input },],
    };
    return TemperatureTableComponent;
}());
//# sourceMappingURL=temperature-table.component.js.map