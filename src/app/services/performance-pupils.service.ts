import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Performance } from '../personal/performance/performance';

@Injectable({
  providedIn: 'root'
})
export class PerformancePupilsService {

  apiURL: string= environment.apiURLBase + "/api/performances";

  constructor(private http: HttpClient) { }

  save(performancePupil: Performance) : Observable<Performance> {
    return this.http.post<Performance>(this.apiURL, performancePupil);
  }

  update(performancePupil: Performance) : Observable<Performance> {
    return this.http.put<Performance>(`${this.apiURL}/${performancePupil.id}`, performancePupil);
  }

  getPerformancePupils() : Observable<Performance[]> {
    return this.http.get<Performance[]>(this.apiURL);
  }

  getPerformancePupil(id: number) : Observable<Performance> {
    return this.http.get<Performance>(`${this.apiURL}/${id}`);
  }

  deletePerformancePupil(id: number) : Observable<any> {
    return this.http.delete<Performance>(`${this.apiURL}/${id}`);
  }
}
