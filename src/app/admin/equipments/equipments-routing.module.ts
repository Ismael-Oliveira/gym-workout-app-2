import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { EquipmentsListComponent } from './equipments-list/equipments-list.component';
import { EquipmentsFormComponent } from './equipments-form/equipments-form.component';

const routes: Routes = [
  {path: "equipments", component: LayoutComponent, children: [
    
    { path: "list", component: EquipmentsListComponent},
    { path: "form", component: EquipmentsFormComponent},
    { path: "form/:id", component: EquipmentsFormComponent},
    { path: "", redirectTo: "/equipments/list", pathMatch: "full"}
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EquipmentsRoutingModule { }
