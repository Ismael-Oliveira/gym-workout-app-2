import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/admin/clients/clients';
import { ClientsService } from 'src/app/services/clients.service';
import { PerformancePupilsService } from 'src/app/services/performance-pupils.service';
import { UtilService } from 'src/app/services/util.service';
import { PerformancePupil } from '../performance';

@Component({
  selector: 'app-pupils-form',
  templateUrl: './performance-pupils-form.component.html',
  styleUrls: ['./performance-pupils-form.component.css']
})
export class PerformancePupilsFormComponent implements OnInit {

  performancePupil: PerformancePupil;
  client: Client;
  controlHideMessageSuccess = {
    success: false
  }
  errors: Object[] = [];
  id: number;

  constructor(private clienteService: ClientsService,private service: PerformancePupilsService, private util: UtilService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.performancePupil = new PerformancePupil();
    this.performancePupil.id = 0;
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
              } else {
                this.client.performances[0] = {id: 0, sex: ''}; 
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

  onSubmit(form) {
    this.performancePupil = form.value;
    this.savePupil();
  }

  cancelCreatePerformance() {
    this.router.navigate(["/trainers/list"]);
  }

  savePupil() {
    this.service.save(this.performancePupil)
    .subscribe({
      next: (response) => {
        this.controlHideMessageSuccess.success = true;
        this.errors = [];
        this.performancePupil = response;
        this.util.hideMessageSuccess(3000, this.controlHideMessageSuccess, () => {
          this.ngOnInit();
        });
      },
      error: (errorResponse) => {
        this.controlHideMessageSuccess.success = false;
        if (errorResponse.error.status == 400) {
          this.errors.push({error: errorResponse.error.message});
          return;
        }
        this.errors = errorResponse.error;
      }
    });
  }

  private updatePupil() {
    this.service.update(this.performancePupil)
          .subscribe({
            next: (response) => {
              this.controlHideMessageSuccess.success = true;
              this.errors = [];
              this.performancePupil = response;
              this.util.hideMessageSuccess(3000, this.controlHideMessageSuccess, () => {
                this.ngOnInit();
              });            
            },
            error: (errorResponse) => {
              this.controlHideMessageSuccess.success = false;
              this.errors = errorResponse.error;
            }
          });
  }

  private verifyPerformanceEmpty(performances: Array<any>) {
    return performances.length > 0;
  }

  private sortPerformanceDesc(performances: Array<any>) {
    performances.sort((a, b) => b.id - a.id)
  }

}
