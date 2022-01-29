import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryExerciseListComponent } from './category-exercise-list/category-exercise-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryRoutingModule } from './category-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryListComponent, CategoryExerciseListComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
