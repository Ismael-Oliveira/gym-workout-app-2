import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';

const routes: Routes = [
  {path: "personal-workout", component: LayoutComponent, children: [
    
    { path: "list", component: WorkoutListComponent},
    { path: "form", component: WorkoutFormComponent},
    // { path: "form/:id", component: PersonalsFormComponent},
    { path: "", redirectTo: "/personal-category/list", pathMatch: "full"}
  
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkoutRoutingModule { }