import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './clients/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  save(client: Client) : Observable<Client> {
    return this.http.post<Client>('http://localhost:8081/api/clients', client);
  }

}
