import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../layout/layout.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {path: "dashboard", component: LayoutComponent, children: [
    { path: "dash", component: DashboardComponent}
  ]}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
