import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipments } from '../equipments/equipments';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  apiURL: string= environment.apiURLBase + "/api/equipments";

  constructor(private http: HttpClient) { }

  save(equipment: Equipments) : Observable<Equipments> {
    return this.http.post<Equipments>(this.apiURL, equipment);
  }

  update(equipment: Equipments) : Observable<Equipments> {
    return this.http.put<Equipments>(`${this.apiURL}/${equipment.id}`, equipment);
  }

  getEquipments() : Observable<Equipments[]> {
    return this.http.get<Equipments[]>(this.apiURL);
  }

  getEquipment(id: number) : Observable<Equipments> {
    return this.http.get<Equipments>(`${this.apiURL}/${id}`);
  }

  deleteEquipments(id: number) : Observable<any> {
    return this.http.delete<Equipments>(`${this.apiURL}/${id}`);
  }
}
