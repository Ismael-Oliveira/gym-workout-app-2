import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsFormComponent } from './clients-form/clients-form.component';
import { ClientsListComponent } from './clients-list/clients-list.component';

const routes: Routes = [
  { path: "clients-list", component: ClientsListComponent},
  { path: "clients-form", component: ClientsFormComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
