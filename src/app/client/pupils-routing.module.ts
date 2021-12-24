import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { PupilsTableComponent } from './pupils-table/pupils-table.component';
import { PupilsComponent } from './pupils/pupils.component';

const routes: Routes = [
  {path: "pupils", component: LayoutComponent, children: [
    
    { path: "home", component: PupilsComponent},
    { path: "table", component: PupilsTableComponent}
  
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PupilsRoutingModule { }
