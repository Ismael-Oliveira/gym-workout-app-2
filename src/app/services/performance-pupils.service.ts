import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PerformancePupil } from '../personal/performance/performance';

@Injectable({
  providedIn: 'root'
})
export class PerformancePupilsService {

  apiURL: string= environment.apiURLBase + "/api/performances";

  constructor(private http: HttpClient) { }

  save(performancePupil: PerformancePupil) : Observable<PerformancePupil> {
    return this.http.post<PerformancePupil>(this.apiURL, performancePupil);
  }

  update(performancePupil: PerformancePupil) : Observable<PerformancePupil> {
    return this.http.put<PerformancePupil>(`${this.apiURL}/${performancePupil.id}`, performancePupil);
  }

  getPerformancePupils() : Observable<PerformancePupil[]> {
    return this.http.get<PerformancePupil[]>(this.apiURL);
  }

  getPerformancePupil(id: number) : Observable<PerformancePupil> {
    return this.http.get<PerformancePupil>(`${this.apiURL}/${id}`);
  }

  deletePerformancePupil(id: number) : Observable<any> {
    return this.http.delete<PerformancePupil>(`${this.apiURL}/${id}`);
  }
}
