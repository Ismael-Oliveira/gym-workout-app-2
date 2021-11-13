import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './template/template.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClientsModule } from './clients/clients.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { ClientsService } from './services/clients.service';
import { AuthService } from './services/auth.service';
import { TokenInterceptor } from './token.interceptor';
import { EquipmentsFormComponent } from './equipments/equipments-form/equipments-form.component';
import { EquipmentsModule } from './equipments/equipments.module';
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
    EquipmentsModule
    
  ],
  providers: [
    ClientsService,
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
