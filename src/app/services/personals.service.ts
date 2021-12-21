import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Personal } from '../personal/Personal';

@Injectable({
  providedIn: 'root'
})
export class PersonalsService {

  apiURL: string= environment.apiURLBase + "/api/personals";

  constructor(private http: HttpClient) { }

  save(personal: Personal) : Observable<Personal> {
    return this.http.post<Personal>(this.apiURL, personal);
  }

  update(personal: Personal) : Observable<Personal> {
    return this.http.put<Personal>(`${this.apiURL}/${personal.id}`, personal);
  }

  getPersonals() : Observable<Personal[]> {
    return this.http.get<Personal[]>(this.apiURL);
  }

  getPersonal(id: number) : Observable<Personal> {
    return this.http.get<Personal>(`${this.apiURL}/${id}`);
  }

  deletePersonal(id: number) : Observable<any> {
    return this.http.delete<Personal>(`${this.apiURL}/${id}`);
  }

}
