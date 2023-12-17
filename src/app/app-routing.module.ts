import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployesComponent} from './components/employes/employes.component';
import {MessagesComponent} from './components/messages/messages.component';
import {HomeComponent} from './components/home/home.component';
import {ServicesComponent} from './components/services/services.component';
import {NewemployeComponent} from "./components/newemploye/newemploye.component";
import {EditemployeComponent} from "./components/editemploye/editemploye.component";
import {NewserviceComponent} from  "./components/newservice/newservice.component";
import {EditserviceComponent} from "./components/editservice/editservice.component";
import {EditmessageComponent} from "./components/editmessage/editmessage.component";



const routes: Routes = [
  {path: 'employe', component: EmployesComponent},
  {path: 'message', component: MessagesComponent},
  {path: 'service', component: ServicesComponent},
  {path:"newEmploye",component:NewemployeComponent},
  {path:"newService",component:NewserviceComponent},
  {path:"editEmploye/:idemploye",component:EditemployeComponent},
  {path:"editService/:idservice",component:EditserviceComponent},
  {path:"editMessage/:idmessage",component:EditmessageComponent},
  {path: '', component: HomeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
