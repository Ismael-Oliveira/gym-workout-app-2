import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalEquipmentsComponent } from './personal-equipments/personal-equipments.component';
import { PersonalEquipmentsFormComponent } from './personal-equipments-form/personal-equipments-form.component';
import { PersonalEquipmentsRoutingModule } from './personalEquipments-routing.module';

@NgModule({
  declarations: [PersonalEquipmentsComponent, PersonalEquipmentsFormComponent],
  imports: [
    CommonModule,
    PersonalEquipmentsRoutingModule
  ]
})
export class PersonalEquipmentsModule { }
