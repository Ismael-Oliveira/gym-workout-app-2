import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PupilsRoutingModule } from './pupils-routing.module';
import { PupilsTableComponent } from './pupils-table/pupils-table.component';
import { PupilsComponent } from './pupils/pupils.component';
import { PupilsFormComponent } from './pupils-form/pupils-form.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PupilsComponent,
    PupilsTableComponent,
    PupilsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PupilsRoutingModule,
    ChartsModule
  ]
})
export class PupilsModule { }
