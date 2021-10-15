import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsRoutingModule } from './clients-routing.module';

@NgModule({
  declarations: [ClientsFormComponent, ClientsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClientsRoutingModule,
  ],
  exports: [
    ClientsFormComponent,
    ClientsListComponent
  ]
})
export class ClientsModule { }
