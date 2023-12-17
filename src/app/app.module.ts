import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { EmployesComponent } from './components/employes/employes.component';
import { ServicesComponent } from './components/services/services.component';
import { MessagesComponent } from './components/messages/messages.component';
import { HomeComponent } from './components/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { NewemployeComponent } from './components/newemploye/newemploye.component';
import { EditemployeComponent } from './components/editemploye/editemploye.component';
import { NewserviceComponent } from './components/newservice/newservice.component';
import { EditserviceComponent } from './components/editservice/editservice.component';
import { NewmessageComponent } from './components/newmessage/newmessage.component';
import { EditmessageComponent } from './components/editmessage/editmessage.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    EmployesComponent,
    ServicesComponent,
    MessagesComponent,
    HomeComponent,
    NewemployeComponent,
    EditemployeComponent,
    NewserviceComponent,
    EditserviceComponent,
    NewmessageComponent,
    EditmessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
