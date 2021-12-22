import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { PersonalsRoutingModule } from './personals-routing.module';
import { PersonalsListComponent } from './personals-list/personals-list.component';
import { PersonalsFormComponent } from './personals-form/personals-form.component'

@NgModule({
  declarations: [
    PersonalsListComponent,
    PersonalsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    PersonalsRoutingModule
  ],
  exports: [
    PersonalsListComponent
  ]
})
export class PersonalsModule { }
