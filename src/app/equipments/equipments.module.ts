import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentsFormComponent } from './equipments-form/equipments-form.component';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { EquipmentsRoutingModule } from './equipments-routing.module';
import { EquipmentsListComponent } from './equipments-list/equipments-list.component';

@NgModule({
  declarations: [
    EquipmentsFormComponent,
    EquipmentsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    EquipmentsRoutingModule
  ],
  exports: [
    EquipmentsFormComponent
  ]
})
export class EquipmentsModule { }
