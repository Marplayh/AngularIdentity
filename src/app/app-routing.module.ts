import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { AutenticacaoComponent } from './layouts/autenticacao/autenticacao.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path:'', component: AutenticacaoComponent, 
  children: [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'cadastro', component: CadastroComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
