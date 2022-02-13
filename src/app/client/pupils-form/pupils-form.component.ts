import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';
import { UtilService } from 'src/app/services/util.service';
import { Client } from '../../admin/clients/clients';

@Component({
  selector: 'app-pupils-form',
  templateUrl: './pupils-form.component.html',
  styleUrls: ['./pupils-form.component.css']
})
export class PupilsFormComponent implements OnInit {

  client: Client;
  success: boolean = false;
  controlHideMessageSuccess = {
    success: false
  }
  errors: Object[] = [];
  id: number;

  constructor(private service: ClientsService, private util: UtilService) {
    this.client = new Client();
    this.client.typeUser = "CLIENT";
  }

  ngOnInit() {
  }

  onSubmit() {
    this.saveClient();
  }

  private saveClient() {
    this.service.save(this.client)
      .subscribe({
        next: (response) => {
          this.controlHideMessageSuccess.success = true;
          this.errors = [];
          this.client = response;
          this.util.hideMessageSuccess(3000, this.controlHideMessageSuccess, () => {
            this.ngOnInit();
          });
        },
        error: (errorResponse) => {
          this.controlHideMessageSuccess.success = false;
          if (errorResponse.error.status == 400) {
            this.errors.push({ error: errorResponse.error.message });
            return;
          }
          // this.errors.push({error: errorResponse.error});
          this.errors.push({error: 'Aluno cadastrado com sucesso'});
        }
      });
  }
}
