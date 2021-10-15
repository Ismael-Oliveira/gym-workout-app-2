import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/clients.service';
import { Client } from '../clients';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {

  client: Client;
  success: Boolean = false;
  errors: string[] = [];

  constructor(private service: ClientsService) {
    this.client = new Client();
    this.client.typeUser = "CLIENT";
  }

  ngOnInit() {
  }

  onSubmit() {
    this.service
    .save(this.client)
    .subscribe({
      next: (response) => {
        this.success = true;
        this.errors = [];
        this.client = response;
      },
      error: (errorResponse) => {
        this.success = false;
        this.errors = errorResponse.error;
      }
    });
  }

}
