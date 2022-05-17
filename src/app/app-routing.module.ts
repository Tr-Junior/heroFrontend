import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'
import { RegistroComponent } from './pages/registro/registro.component'
import { NovoComponent } from './pages/novo/novo.component'
import { ListagemComponent } from './pages/listagem/listagem.component'
import { AuthService } from './services/auth.service';



const routes: Routes = [

  { path: '', component: LoginComponent },

  { path: 'cadastro', component: RegistroComponent },
  { path: 'novo', component: NovoComponent, canActivate: [AuthService] },
  { path: 'selectIncidents', component: ListagemComponent, canActivate: [AuthService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
