import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PersonalsService } from 'src/app/services/personals.service';
import { Personal } from '../Personal';

@Component({
  selector: 'app-personals-list',
  templateUrl: './personals-list.component.html',
  styleUrls: ['./personals-list.component.css']
})
export class PersonalsListComponent implements OnInit {

  personals: Personal[] = [];
  errorMessageDeletePersonal: String = "";
  selectedPersonal: Personal;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private service: PersonalsService, private router: Router) { }

  ngOnInit() {
    this.getAllPersonals();
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

  newPersonal() {
    this.router.navigate(["/personals/form"]);
  }

  getAllPersonals(): void {
    this.service.getPersonals()
          .subscribe((response: any) => {
            this.personals = response.content;
            // initiate our data table
            this.dtTrigger.next(true);
          });
  }
  
  deletePersonal(id) {
    this.service.deletePersonal(id)
          .subscribe({
            next: () => {
              this.dtTrigger.unsubscribe();
              this.ngOnInit();
            },
            error: () => {
              this.errorMessageDeletePersonal = "Erro ao tentar deletar este aluno(a).";
            }
          });
  }

  prepareToDeletePersonal(personal) {
    this.selectedPersonal = personal;
  }
}
