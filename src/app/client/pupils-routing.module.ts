import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { PerformancePupilsFormComponent } from '../personal/performance/performance-pupils-form/performance-pupils-form.component';
import { PupilsFormComponent } from './pupils-form/pupils-form.component';
import { PupilsTableComponent } from './pupils-table/pupils-table.component';
import { PupilsComponent } from './pupils/pupils.component';

const routes: Routes = [
  {path: "pupils", component: LayoutComponent, children: [
    
    { path: "create", component: PupilsFormComponent},
    { path: "home", component: PupilsComponent},
    { path: "table", component: PupilsTableComponent}
  
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PupilsRoutingModule { }
