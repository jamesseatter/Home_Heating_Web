import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {AppComponent} from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
// import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
    // {path: '', redirectTo: '/temperature', pathMatch: 'full' },
    {path: '', component: DashboardComponent},
    // {path: 'admin', component: AdminComponent}
    // {path: 'help', component: HelpComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}

