import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ChartsModule } from 'ng2-charts';

import { ClientsFormComponent } from './clients-form/clients-form.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsRoutingModule } from './clients-routing.module';

@NgModule({
  declarations: [ClientsFormComponent, ClientsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    ChartsModule,
    ClientsRoutingModule,
  ],
  exports: [
    ClientsFormComponent,
    ClientsListComponent
  ]
})
export class ClientsModule { }
