import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Client } from 'src/app/admin/clients/clients';
import { Constants } from 'src/app/constants';
import { ClientsService } from 'src/app/services/clients.service';
import { PerformancePupil } from '../performance';

@Component({
  selector: 'app-pupils-view',
  templateUrl: './performance-pupils-view.component.html',
  styles: []
})
export class PerformancePupilsViewComponent implements OnInit {

  performancePupil: PerformancePupil;
  client: Client;
  id: number;
  errors: [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private clienteService: ClientsService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.performancePupil = new PerformancePupil();
    this.performancePupil.id = 0;
    this.dtOptions = Constants.CONFIG_DATA_TABLES;
  }

  ngOnInit() {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe({
      next: (urlParams) => {
        this.id = urlParams['id'];
        if(this.id) {
          this.clienteService.getClient(this.id).subscribe({
            next: (response) => {
              this.client = response;
              if (this.verifyPerformanceEmpty(this.client.performances)) {
                this.sortPerformanceDesc(this.client.performances);
                  // initiate our data table
                  this.dtTrigger.next(true);
              } else {
                this.client.performances[0] = {id: 0}; 
              }
            },
            error: (errorResponse) => {
              this.errors = errorResponse.error;
            }
          });
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public verifyGender(num: number) {
    return (num == 1) ? 'Masculino' : (num == 2) ? 'Feminino' : 'Não cadastrado';
  }

  private verifyPerformanceEmpty(performances: Array<any>) {
    return performances.length > 0;
  }

  private sortPerformanceDesc(performances: Array<any>) {
    performances.sort((a, b) => b.id - a.id)
  }

  public calculatorTGC(performance: PerformancePupil) {
    let bmi = performance.weight/(Math.pow(performance.height,2));
    if (performance.sex === 1) {
      return (1.20 * bmi + 0.23*performance.ageOld - 16.2).toFixed(2);
    } else if (performance.sex === 2) {
      return (1.20 * bmi + 0.23*performance.ageOld - 5.4).toFixed(2);
    }
  }

  public calculatorBMI(performance: PerformancePupil) {
    return (performance.weight/(Math.pow(performance.height,2))).toFixed(2);
  }

  public backToList() {
    this.router.navigate(["/trainers/list"]);
  }

}
