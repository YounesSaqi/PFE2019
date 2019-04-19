import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {PageAcceuillComponent} from "./page-acceuill/page-acceuill.component";
import {AmplitudeComponent} from "./amplitude/amplitude.component";
import {TnsnameOraComponent} from "./tnsname-ora/tnsname-ora.component"
import {SqlhostComponent} from "./sqlhost/sqlhost.component"
import {ExportComponent}  from "./export/export.component"


import {GeneroComponent} from "./genero/genero.component"
import {ConnexionApplicatifComponent} from "./connexion-applicatif/connexion-applicatif.component"
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'acceuill', component: PageAcceuillComponent },
  { path: 'amplitude', component: AmplitudeComponent },
  { path: 'applicatif', component: ConnexionApplicatifComponent},
  { path: 'tnsname', component: TnsnameOraComponent },
  { path: 'sqlhosts', component: SqlhostComponent },
  { path: 'genero', component: GeneroComponent },
  { path: 'export', component:ExportComponent},

  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
