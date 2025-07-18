import { Inscricao } from './inscricao/inscricao';
import { Home } from './home/home';
import { Routes } from '@angular/router';
import { Sobre } from './sobre/sobre';
import { Fotos } from './fotos/fotos';
import { Agenda } from './agenda/agenda';
import { Apoiar } from './apoiar/apoiar';
import { Contato } from './contato/contato';
import { Eventos } from './eventos/eventos';
import { Coordenacao } from './coordenacao/coordenacao';
import { Coslovers } from './coslovers/coslovers';
import { Cncosplay } from './cncosplay/cncosplay';
import { Cadastro } from './cadastro/cadastro';
import { AuthGuard } from './auth';
import { Login } from './login/login';
import { Perfil } from './perfil/perfil';
import { Admin } from './admin/admin';


export const routes: Routes = [
  // Rotas de Autenticação (protegidas pelo AuthGuard para evitar acesso se já logado)
  { path: 'cadastro', component: Cadastro, canActivate: [AuthGuard] },
  { path: 'login', component: Login, canActivate: [AuthGuard] },
  { path: 'perfil', component: Perfil, canActivate: [AuthGuard] },
  { path: 'admin', component: Admin, canActivate: [AuthGuard] },

  // Rota Padrão: Redireciona para 'home' (que será protegida)
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Rotas da Aplicação (algumas protegidas pelo AuthGuard, outras públicas)
  { path: 'home', component: Home }, // Exemplo: Home precisa de login
  { path: 'sobre', component: Sobre },
  { path: 'fotos', component: Fotos },
  { path: 'agenda', component: Agenda },
  { path: 'apoiar', component: Apoiar },
  { path: 'contato', component: Contato },
  { path: 'inscricao', component: Inscricao },
  { path: 'eventos', component: Eventos },
  { path: 'coordenacao', component: Coordenacao },
  { path: 'coslovers', component: Coslovers },
  { path: 'cncosplay', component: Cncosplay },


  // Rota Curinga: Redireciona para 'home' se nenhuma rota acima for encontrada
  { path: '**', redirectTo: '/home' }
];
