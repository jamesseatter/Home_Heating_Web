import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard.component';
import { TemperatureAlertComponent } from './temperature-alert/temperature-alert.component';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { TemperatureTableComponent } from './temperature-table/temperature-table.component';
import { TemperatureGaugeComponent } from './temperature-gauge/temperature-gauge.component';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { ConfigService } from '../config/config.service';

import { DataService } from '../data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    TemperatureAlertComponent,
    TemperatureChartComponent,
    TemperatureTableComponent,
    TemperatureGaugeComponent
  ],
  providers: [ConfigService,
    DataService
  ]
})
export class DashboardModule {}
