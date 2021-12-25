import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { PupilsComponent } from './pupils-list/pupils.component';
import { PupilsFormComponent } from './pupils-form/pupils-form.component';
import { SpreadSheetFormComponent } from './spread-sheet-form/spread-sheet-form.component';
import { PupilsEditComponent } from './pupils-edit/pupils-edit.component';
import { PupilsViewComponent } from './pupils-view/pupils-view.component';

const routes: Routes = [
  {path: "trainers", component: LayoutComponent, children: [
    
    { path: "list", component: PupilsComponent},
    { path: "form", component: PupilsFormComponent},
    { path: "form/:id", component: PupilsFormComponent},
    { path: "edit/:id", component: PupilsEditComponent},
    { path: "view/:id", component: PupilsViewComponent},
    { path: "spreadsheet-form/:id", component: SpreadSheetFormComponent},
    { path: "", redirectTo: "/trainers/list", pathMatch: "full"}
  
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkPupilsRoutingModule { }