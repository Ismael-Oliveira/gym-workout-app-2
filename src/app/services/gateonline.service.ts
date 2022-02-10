import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../admin/clients/clients';

interface GateOnline  {
  "dateArrive": Date,
  "quantityClient": Number,
  "serial": Number
}

@Injectable({
  providedIn: 'root'
})
export class GateOnlineService {

  apiURL: string= environment.apiURLBase + "/api/gate";

  constructor(private http: HttpClient) { }

  getCapacity() : Observable<GateOnline> {
    return this.http.get<GateOnline>(this.apiURL);
  }

}
