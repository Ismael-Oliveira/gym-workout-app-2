import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';
import { Client } from '../clients';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  clients: Client[] = [];
  errorMessageDeleteClient: String = "";
  selectedClient: Client;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: ClientsService, private router: Router) { }

  ngOnInit() {
    this.getAllClients();
    this.dtOptions = {
      dom: '<"top"B>rt<"bottom"f>rt<"bottom"lp><"clear">',
      lengthMenu: [5, 10, 25, 50, 100],
      pagingType: 'full_numbers',
      processing: true,
      language: {
        search: "Pesquisar",
        emptyTable: "Sem dados disponíveis.",
        lengthMenu: "Exibindo _MENU_ entradas",
        info: "Exibindo de _START_ até _END_, contém: _TOTAL_ entradas",
        paginate: {
          first:      "Primeiro",
          last:       "Ultimo",
          next:       "Próximo",
          previous:   "Anterior"
        },
      }
    };
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  newClient() {
    this.router.navigate(["clients-form"]);
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
