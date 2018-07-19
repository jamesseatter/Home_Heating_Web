import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlerthistoryComponent } from './alerthistory.component';
import { AlertHistoryRoutingModule } from './alerthistory-routing.module';

import { DataAlertService } from './data-alert/data-alert.service';

@NgModule({
  imports: [
    CommonModule,
    AlertHistoryRoutingModule,
    FormsModule
  ],
  declarations: [AlerthistoryComponent],
  providers: [
    DataAlertService
  ]
})
export class AlerthistoryModule { }
