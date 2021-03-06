import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Client } from 'src/app/admin/clients/clients';
import { Constants } from 'src/app/constants';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-pupils',
  templateUrl: './performance-pupils.component.html',
  styleUrls: ['./performance-pupils.component.css']
})
export class PerformancePupilsComponent implements OnInit {

  clients: Client[] = [];
  errorMessageDeleteClient: String = "";
  selectedClient: Client;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: ClientsService, private router: Router) { }

  ngOnInit() {
    this.getAllClients();
    this.dtOptions = Constants.CONFIG_DATA_TABLES;
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  newClient() {
    this.router.navigate(["/personal-workout/form"]);
  }

  getAllClients(): void {
    this.service.getClients()
          .subscribe((response: any) => {
            this.clients = response.content;
            // initiate our data table
            this.dtTrigger.next(true);
          });
  }
  
  deleteClient(id) {
    this.service.deleteClient(id)
          .subscribe({
            next: () => {
              this.dtTrigger.unsubscribe();
              this.ngOnInit();
            },
            error: () => {
              this.errorMessageDeleteClient = "Erro ao tentar deletar este aluno(a).";
            }
          });
  }

  prepareToDeleteClient(client) {
    this.selectedClient = client;
  }


}
