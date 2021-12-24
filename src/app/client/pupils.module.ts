import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PupilsRoutingModule } from './pupils-routing.module';
import { PupilsTableComponent } from './pupils-table/pupils-table.component';
import { PupilsComponent } from './pupils/pupils.component';

@NgModule({
  declarations: [
    PupilsComponent,
    PupilsTableComponent
  ],
  imports: [
    CommonModule,
    PupilsRoutingModule
  ]
})
export class PupilsModule { }
