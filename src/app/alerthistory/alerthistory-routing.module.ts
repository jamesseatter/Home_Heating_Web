import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlerthistoryComponent } from './alerthistory.component';

const alerthistoryRoutes: Routes = [
  { path: 'alerthistory',  component: AlerthistoryComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(alerthistoryRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AlertHistoryRoutingModule { }
