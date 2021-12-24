import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PupilsComponent } from 'src/app/personal/pupils/pupils-list/pupils.component';
import { PupilsFormComponent } from './pupils-form/pupils-form.component';
import { WorkPupilsRoutingModule } from './workPupils-routing.module';

@NgModule({
  declarations: [
    PupilsComponent,
    PupilsFormComponent
  ],
  imports: [
    CommonModule,
    WorkPupilsRoutingModule
  ],
  exports: [
    PupilsComponent,
    PupilsFormComponent
  ]
})
export class WorkPupilsModule { }
