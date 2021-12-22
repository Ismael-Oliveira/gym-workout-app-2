import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../admin/clients/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  apiURL: string= environment.apiURLBase + "/api/clients";

  constructor(private http: HttpClient) { }

  save(client: Client) : Observable<Client> {
    return this.http.post<Client>(this.apiURL, client);
  }

  update(client: Client) : Observable<Client> {
    return this.http.put<Client>(`${this.apiURL}/${client.id}`, client);
  }

  getClients() : Observable<Client[]> {
    return this.http.get<Client[]>(this.apiURL);
  }

  getClient(id: number) : Observable<Client> {
    return this.http.get<Client>(`${this.apiURL}/${id}`);
  }

  deleteClient(id: number) : Observable<any> {
    return this.http.delete<Client>(`${this.apiURL}/${id}`);
  }

}
