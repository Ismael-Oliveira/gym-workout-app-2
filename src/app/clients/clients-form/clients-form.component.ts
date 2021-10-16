import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';
import { UtilService } from 'src/app/services/util.service';
import { Client } from '../clients';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {

  client: Client;
  success: boolean = false;
  errors: string[] = [];
  id: number;

  constructor(private service: ClientsService, private util: UtilService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.client = new Client();
    this.client.typeUser = "CLIENT";
  }

  ngOnInit() {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe({
      next: (urlParams) => {
        this.id = urlParams['id'];
        if(this.id) {
          this.service.getClient(this.id).subscribe({
            next: (response) => {
              this.client = response;
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
    if(this.client.id) {
      this.updateClient();
    } else {
      this.saveClient();
    }
  }
  
  cancelCreateClients() {
    this.router.navigate(["clients-list"]);
  }

  private saveClient() {
    this.service.save(this.client)
          .subscribe({
            next: (response) => {
              this.success = true;
              this.errors = [];
              this.client = response;
              this.hideMessageSuccess();
            },
            error: (errorResponse) => {
              this.success = false;
              this.errors = errorResponse.error;
            }
          });
  }

  private updateClient() {
    this.service.update(this.client)
          .subscribe({
            next: (response) => {
              this.success = true;
              this.errors = [];
              this.client = response;
              this.hideMessageSuccess();
            },
            error: (errorResponse) => {
              this.success = false;
              this.errors = errorResponse.error;
            }
          });
  }

  private hideMessageSuccess() {
    setTimeout(() => {
      this.success = false;
      this.ngOnInit();
    }, 3000)
  }
}
