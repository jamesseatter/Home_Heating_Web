import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ITemperatureData {
    sysid: string;
    date: string;
    temperature_base: number;
    temperature: number;
    uTemperaturecol: number;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private ITemperatureData_Dummy_Record = { sysid: '0', date: '01/01/2018',  temperature_base: 0, temperature: 0, uTemperaturecol: 0 };
  public temperatures: BehaviorSubject<ITemperatureData[]>;
  public lastTemperature: BehaviorSubject<ITemperatureData>;
  private dataStore: { temperatures: ITemperatureData[], alerts: ITemperatureData[], lastTemperature: ITemperatureData };

  private baseUrl: string;
  private httpOptions: {headers: HttpHeaders};

  constructor(private http: HttpClient) {
    this.dataStore = { temperatures: [], alerts: [], lastTemperature: this.ITemperatureData_Dummy_Record};
    this.temperatures = new BehaviorSubject<ITemperatureData[]>([]);
    this.lastTemperature = new BehaviorSubject<ITemperatureData>(this.ITemperatureData_Dummy_Record);

    this.baseUrl = 'http://localhost:8090/api';
    this.httpOptions = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': 'my-auth-token'})
    };
  }

  loadTemperatures(days: string = '1') {
    const queryURL = (this.baseUrl).concat('/lastdays/', days);
    this.http.get(queryURL, this.httpOptions).subscribe((data: ITemperatureData[]) => {
      console.log('Data.Service : Received temperature data from API, rows - ', data.length);
      this.dataStore.temperatures = data;
      this.temperatures.next(data);
      this.lastTemperature.next(data[data.length - 1]);
    }, error => console.log('Data.Service : Could not load temperature data'));

  }

  loadAlerts(days: string = '1') {
    const queryURL = (this.baseUrl).concat('/alerts/', days);
    this.http.get(queryURL, this.httpOptions).subscribe((data: ITemperatureData[]) => {
      console.log('Data.Service : Received alert data from API, rows - ', data.length);
      this.dataStore.temperatures = data;
      this.temperatures.next(data);
      this.lastTemperature.next(data[data.length - 1]);
    }, error => console.log('Data.Service : Could not load alert data'));

  }

}
