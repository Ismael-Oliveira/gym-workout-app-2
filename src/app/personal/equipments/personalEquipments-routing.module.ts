import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { PersonalEquipmentsComponent } from './personal-equipments/personal-equipments.component';
import { PersonalEquipmentsFormComponent } from './personal-equipments-form/personal-equipments-form.component';

const routes: Routes = [
  {path: "personal-equipment", component: LayoutComponent, children: [
    
    { path: "list", component: PersonalEquipmentsComponent},
    { path: "form", component: PersonalEquipmentsFormComponent},
    // { path: "form/:id", component: PersonalsFormComponent},
    { path: "", redirectTo: "/personal-equipment/list", pathMatch: "full"}
  
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalEquipmentsRoutingModule { }