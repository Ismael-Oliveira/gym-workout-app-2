import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { PupilsComponent } from './pupils-list/pupils.component';
import { PupilsFormComponent } from './pupils-form/pupils-form.component';

const routes: Routes = [
  {path: "trainers", component: LayoutComponent, children: [
    
    { path: "list", component: PupilsComponent},
    { path: "form", component: PupilsFormComponent},
    // { path: "form/:id", component: PersonalsFormComponent},
    { path: "", redirectTo: "/trainers/list", pathMatch: "full"}
  
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkPupilsRoutingModule { }