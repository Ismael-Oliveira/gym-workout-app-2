import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './template/template.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClientsModule } from './admin/clients/clients.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { ClientsService } from './services/clients.service';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './token.interceptor';
import { EquipmentsModule } from './admin/equipments/equipments.module';
import { PersonalsModule } from './admin/personals/personals.module';
import { PersonalsService } from './services/personals.service';
import { PupilsModule } from './client/pupils.module';
import { WorkPupilsModule } from './personal/performance/performancePupils.module';
import { PersonalEquipmentsModule } from './personal/equipments/personal-equipments.module';
import { CategoryModule } from './personal/category/category.module';
import { WorkoutModule } from './personal/workout/workout.module';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    TemplateModule,
    ClientsModule,
    EquipmentsModule,
    PersonalsModule,
    PupilsModule,
    WorkPupilsModule,
    PersonalEquipmentsModule,
    CategoryModule,
    WorkoutModule
  ],
  providers: [
    ClientsService,
    PersonalsService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
