import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryExerciseListComponent } from './category-exercise-list/category-exercise-list.component';

const routes: Routes = [
  {path: "personal-category", component: LayoutComponent, children: [
    
    { path: "list", component: CategoryListComponent},
    { path: "form", component: CategoryFormComponent},
    { path: "category-exercise-list/:id", component: CategoryExerciseListComponent},
    { path: "", redirectTo: "/personal-category/list", pathMatch: "full"}
  
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }