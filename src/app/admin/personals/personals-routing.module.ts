import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { PersonalsListComponent } from './personals-list/personals-list.component';
import { PersonalsFormComponent } from './personals-form/personals-form.component';

const routes: Routes = [
  {path: "personals", component: LayoutComponent, children: [
    
    { path: "list", component: PersonalsListComponent},
    { path: "form", component: PersonalsFormComponent},
    { path: "form/:id", component: PersonalsFormComponent},
    { path: "", redirectTo: "/personals/list", pathMatch: "full"}
  
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalsRoutingModule { }