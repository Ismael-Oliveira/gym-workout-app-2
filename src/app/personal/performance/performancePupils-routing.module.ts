import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { PerformancePupilsComponent } from './performance-pupils-list/performance-pupils.component';
import { PerformancePupilsFormComponent } from './performance-pupils-form/performance-pupils-form.component';
import { SpreadSheetFormComponent } from './spread-sheet-form/spread-sheet-form.component';
import { PerformancePupilsEditComponent } from './performance-pupils-edit/performance-pupils-edit.component';
import { PerformancePupilsViewComponent } from './performance-pupils-view/performance-pupils-view.component';

const routes: Routes = [
  {path: "trainers", component: LayoutComponent, children: [
    
    { path: "list", component: PerformancePupilsComponent},
    { path: "form", component: PerformancePupilsFormComponent},
    { path: "form/:id", component: PerformancePupilsFormComponent},
    { path: "edit/:id", component: PerformancePupilsEditComponent},
    { path: "view/:id", component: PerformancePupilsViewComponent},
    { path: "spreadsheet-form/:id", component: SpreadSheetFormComponent},
    { path: "", redirectTo: "/trainers/list", pathMatch: "full"}
  
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkPupilsRoutingModule { }