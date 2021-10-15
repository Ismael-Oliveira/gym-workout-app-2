import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../clients/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  save(client: Client) : Observable<Client> {
    return this.http.post<Client>('http://localhost:8081/api/clients', client);
  }

  getClients() : Observable<any> {
    let client: Client = new Client();
    client.id = 1;
    client.typeUser="ALUNO";
    client.name = "Anja";
    client.birthDate = "2021-10-05";
    // let clients = this.http.get<Client>('http://localhost:8081/api/clients');
    let clients = this.http.get<Client>('https://jsonplaceholder.typicode.com/users');
    return clients;
  }

}
