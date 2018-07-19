import { Component, OnInit } from '@angular/core';
import { ConfigService } from './config/config.service';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public title = 'PPE Heating System';
  // private errorMessage;

  // constructor(private configService: ConfigService) {}

  ngOnInit(): void {
  //    this.configService.loadData();
  }

}
