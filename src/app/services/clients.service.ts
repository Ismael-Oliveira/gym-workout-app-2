import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../clients/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  baseURL: string = "http://localhost:8081/api/clients"; 

  constructor(private http: HttpClient) { }

  save(client: Client) : Observable<Client> {
    return this.http.post<Client>(this.baseURL, client);
  }

  update(client: Client) : Observable<Client> {
    return this.http.put<Client>(`${this.baseURL}/${client.id}`, client);
  }

  getClients() : Observable<Client[]> {
    let clients = this.http.get<Client[]>(this.baseURL);
    return clients;
  }

  getClient(id: number) : Observable<Client> {
    let client = this.http.get<Client>(`${this.baseURL}/${id}`);
    return client;
  }

  deleteClient(id: number) : Observable<any> {
    let client = this.http.delete<Client>(`${this.baseURL}/${id}`);
    return client;
  }

}
