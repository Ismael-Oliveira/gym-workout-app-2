import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PupilsComponent } from 'src/app/personal/pupils/pupils-list/pupils.component';
import { PupilsFormComponent } from './pupils-form/pupils-form.component';
import { WorkPupilsRoutingModule } from './workPupils-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SpreadSheetFormComponent } from './spread-sheet-form/spread-sheet-form.component';
import { PupilsEditComponent } from './pupils-edit/pupils-edit.component';
import { PupilsViewComponent } from './pupils-view/pupils-view.component';
@NgModule({
  declarations: [
    PupilsComponent,
    PupilsFormComponent,
    SpreadSheetFormComponent,
    PupilsEditComponent,
    PupilsViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    WorkPupilsRoutingModule
  ],
  exports: [
    PupilsComponent,
    PupilsFormComponent,
    PupilsEditComponent,
    SpreadSheetFormComponent
  ]
})
export class WorkPupilsModule { }
