import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Application Services
import { ConfigService } from './config/config.service';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AdminComponent } from './admin/admin.component';

// Modules
import { DashboardModule } from './dashboard/dashboard.module';
import { AlerthistoryModule } from './alerthistory/alerthistory.module';
// import { AdminComponent } from './admin/admin.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    AlerthistoryModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
