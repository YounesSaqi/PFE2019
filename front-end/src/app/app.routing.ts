import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {ListUserComponent} from "./list-user/list-user.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {PageAcceuillComponent} from "./page-acceuill/page-acceuill.component";
import {AmplitudeComponent} from "./amplitude/amplitude.component"
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'acceuill', component: PageAcceuillComponent },
  { path: 'amplitude', component: AmplitudeComponent },
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
