import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

export interface ISysConfig {
  sysid: number;
  name: string;
  value: string;
  description: string;
  updated_on: string;
}

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  private baseUrl: string;
  private dataStore: ISysConfig[];
  private httpOptions: {headers: HttpHeaders};

  constructor(private http: HttpClient) {

    this.dataStore = [];
    this.baseUrl = 'http://localhost:8090/api';
    this.httpOptions = {
                        headers: new HttpHeaders({
                            'Content-Type': 'application/json; charset=UTF-8',
                            'Authorization': 'my-auth-token'})
    };
  }

  public loadData() {
    const queryURL = (this.baseUrl).concat('/sysconfig');
    this.http.get(queryURL, this.httpOptions).subscribe((data: ISysConfig[]) => {
      console.log('Config.Service : Received config data from API, rows - ', data.length);
      this.dataStore = data;
    }, error => console.log('Data.Service : Could not load temperature data'));

  }

  public getConfig(key: string) {
    return this.dataStore.filter(x => x.name === key)[0];
  }
}
