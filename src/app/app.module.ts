import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TemplateModule } from './template/template.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ClientsModule } from './clients/clients.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    HttpClientModule,
    ClientsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
