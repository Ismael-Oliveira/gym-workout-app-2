import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Equipments } from 'src/app/admin/equipments/equipments';
import { EquipmentsService } from 'src/app/services/equipments.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-personal-equipments-form',
  templateUrl: './personal-equipments-form.component.html',
  styleUrls: ['./personal-equipments-form.component.css']
})
export class PersonalEquipmentsFormComponent implements OnInit {

  equipment: Equipments;
  controlHideMessageSuccess = {
    success: false
  }
  errors: Object[] = [];
  id: number;

  constructor(private service: EquipmentsService, private util: UtilService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.equipment = new Equipments();
    this.equipment.statusEquipment = "AVAILABLE";
  }

  ngOnInit() {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe({
      next: (urlParams) => {
        this.id = urlParams['id'];
        if(this.id) {
          this.service.getEquipment(this.id).subscribe({
            next: (response) => {
              this.translateStatusEquipment(response);
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
    if(this.equipment.id) {
      this.updateEquipment();
    } else {
      this.saveEquipment();
    }
  }

  cancelCreateEquipments() {
    this.router.navigate(["/personal-equipment/list"]);
  }

  saveEquipment() {
    this.service.save(this.equipment)
    .subscribe({
      next: (response) => {
        this.controlHideMessageSuccess.success = true;
        this.errors = [];
        this.translateStatusEquipment(response);
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

  private updateEquipment() {
    this.service.update(this.equipment)
          .subscribe({
            next: (response) => {
              this.controlHideMessageSuccess.success = true;
              this.errors = [];
              this.translateStatusEquipment(response);
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

  private translateStatusEquipment(response) {
    switch(response.statusEquipment) {
      case "Dispon??vel":
        this.equipment.statusEquipment = "AVAILABLE";
        break;
      case "Indispon??vel":
        this.equipment.statusEquipment = "UNAVAILABLE";
        break;
      case "Manuten????o":
        this.equipment.statusEquipment = "MAINTENANCE";
        break;
    }
    this.equipment.id = response.id;
    this.equipment.name = response.name;
    this.equipment.code = response.code;
  }

}
