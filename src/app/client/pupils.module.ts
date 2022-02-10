import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PupilsRoutingModule } from './pupils-routing.module';
import { PupilsTableComponent } from './pupils-table/pupils-table.component';
import { PupilsComponent } from './pupils/pupils.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    PupilsComponent,
    PupilsTableComponent
  ],
  imports: [
    CommonModule,
    PupilsRoutingModule,
    ChartsModule
  ]
})
export class PupilsModule { }
