import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalEquipmentsComponent } from './personal-equipments/personal-equipments.component';
import { PersonalEquipmentsFormComponent } from './personal-equipments-form/personal-equipments-form.component';
import { PersonalEquipmentsRoutingModule } from './personalEquipments-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PersonalEquipmentsComponent, PersonalEquipmentsFormComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    PersonalEquipmentsRoutingModule
  ]
})
export class PersonalEquipmentsModule { }
