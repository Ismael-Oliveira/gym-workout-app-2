import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PerformancePupilsComponent } from 'src/app/personal/performance/performance-pupils-list/performance-pupils.component';
import { PerformancePupilsFormComponent } from './performance-pupils-form/performance-pupils-form.component';
import { WorkPupilsRoutingModule } from './performancePupils-routing.module';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SpreadSheetFormComponent } from './spread-sheet-form/spread-sheet-form.component';
import { PerformancePupilsEditComponent } from './performance-pupils-edit/performance-pupils-edit.component';
import { PerformancePupilsViewComponent } from './performance-pupils-view/performance-pupils-view.component';
@NgModule({
  declarations: [
    PerformancePupilsComponent,
    PerformancePupilsFormComponent,
    SpreadSheetFormComponent,
    PerformancePupilsEditComponent,
    PerformancePupilsViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    MatTooltipModule,
    WorkPupilsRoutingModule
  ],
  exports: [
    PerformancePupilsComponent,
    PerformancePupilsFormComponent,
    PerformancePupilsEditComponent,
    SpreadSheetFormComponent
  ]
})
export class WorkPupilsModule { }
