import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutRoutingModule } from './workout-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [WorkoutListComponent, WorkoutFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    WorkoutRoutingModule
  ]
})
export class WorkoutModule { }
