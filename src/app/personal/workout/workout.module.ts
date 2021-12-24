import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutRoutingModule } from './workout-routing.module';

@NgModule({
  declarations: [WorkoutListComponent, WorkoutFormComponent],
  imports: [
    CommonModule,
    WorkoutRoutingModule
  ]
})
export class WorkoutModule { }
