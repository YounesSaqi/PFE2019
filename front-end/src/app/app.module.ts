import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {routing} from "./app.routing";
import {AuthenticationService} from "./service/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import {ListUserComponent} from "./list-user/list-user.component";
import {UserService} from "./service/user.service";
import {HostService} from "./service/host.service";

import { PageAcceuillComponent } from './page-acceuill/page-acceuill.component';
import { AmplitudeComponent } from './amplitude/amplitude.component';
import { ConnexionApplicatifComponent } from './connexion-applicatif/connexion-applicatif.component';
import { SqlhostComponent } from './sqlhost/sqlhost.component';
import { TnsnameOraComponent } from './tnsname-ora/tnsname-ora.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    PageAcceuillComponent,
    AmplitudeComponent,
    ConnexionApplicatifComponent,
    SqlhostComponent,
    TnsnameOraComponent,
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, UserService,HostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
