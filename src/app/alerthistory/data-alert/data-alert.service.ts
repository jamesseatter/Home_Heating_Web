import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertData } from '../Alert.model';


@Injectable()
export class DataAlertService {
  private baseUrl: string;
  private httpOptions: {headers: HttpHeaders, params: HttpParams};

  public  alerts$: Observable<AlertData[]>;
  private alerts: BehaviorSubject<AlertData[]>;

  private dataStore: {
    alerts: AlertData[]
  };

  constructor(private http: HttpClient) {
    this.dataStore = { alerts: [] };
    this.alerts = <BehaviorSubject<AlertData[]>>new BehaviorSubject([]);
    this.alerts$ = this.alerts.asObservable();

    this.baseUrl = 'http://localhost:8090/api';
  }

  loadData(historyDays = '1') {
    const params: URLSearchParams = new URLSearchParams();
    params.set('q', historyDays);
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'my-auth-token'}),
      params: new HttpParams().set('q', historyDays)
    };
    // const headers = new Headers({ 'Content-Type': 'application/json; charset=UTF-8' });
    // const options = new RequestOptions({headers: headers , search: params});



    // this.http.get(`${this.baseUrl}/alertsquery.php`, httpOptions)
    //           .pipe(map(response => response.json()))
    //           .subscribe(
    //             data => {
    //               if (data) {
    //                 console.log('DataAlert.Service: Received alert data.');
    //                 try {
    //                   this.dataStore.alerts = data;
    //                   this.alerts.next(Object.assign({}, this.dataStore).alerts);
    //                 } catch (e) {
    //                   console.log('DataAlert.Service: ERROR PROCESSING DATA, ' + e);
    //                 }
    //               }
    //             },
    //             error => console.log('DataAlert.Service: Could not load alert data.')
    //           );

  }
}
