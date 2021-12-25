import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router: Router) { }

  ngOnInit() {
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
    this.router.navigate(["/personal-workout/form"]);
  }

}
