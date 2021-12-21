import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/services/util.service';
import { PersonalsService } from 'src/app/services/personals.service';
import { Personal } from '../Personal';

@Component({
  selector: 'app-personals-form',
  templateUrl: './personals-form.component.html',
  styles: []
})
export class PersonalsFormComponent implements OnInit {

  personal: Personal;
  success: boolean = false;
  controlHideMessageSuccess = {
    success: false
  }
  errors: Object[] = [];
  id: number;

  constructor(private service: PersonalsService, private util: UtilService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.personal = new Personal;
    this.personal.typeUser = "PERSONAL";
  }

  ngOnInit() {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe({
      next: (urlParams) => {
        this.id = urlParams['id'];
        if(this.id) {
          this.service.getPersonal(this.id).subscribe({
            next: (response) => {
              this.personal = response;
            },
            error: (errorResponse) => {
              this.errors = errorResponse.error;
            }
          });
        }
      }
    })
  }

  onSubmit() {
    if(this.personal.id) {
      this.updateClient();
    } else {
      this.saveClient();
    }
  }
  
  cancelCreateClients() {
    this.router.navigate(["/personals/list"]);
  }

  private saveClient() {
    this.service.save(this.personal)
          .subscribe({
            next: (response) => {
              this.controlHideMessageSuccess.success = true;
              this.errors = [];
              this.personal = response;
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

  private updateClient() {
    this.service.update(this.personal)
          .subscribe({
            next: (response) => {
              this.controlHideMessageSuccess.success = true;
              this.errors = [];
              this.personal = response;
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
}
