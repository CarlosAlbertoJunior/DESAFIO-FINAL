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


export const routes: Routes = [
  // Rota padrão: redireciona para 'inicio' quando a URL é '/'
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Rotas para as suas páginas
  { path: 'home', component: Home },
  { path: 'sobre', component: Sobre },
  { path: 'fotos', component: Fotos },
  { path: 'agenda', component: Agenda },
  { path: 'apoiar', component: Apoiar },
  { path: 'contato', component: Contato },
  { path: 'inscricao', component: Inscricao }, // Note a convenção de kebab-case para URLs
  { path: 'eventos', component: Eventos },
  { path: 'coordenacao', component: Coordenacao },
  { path: 'coslovers', component: Coslovers },
  { path: 'cncosplay', component: Cncosplay },


  { path: '**', redirectTo: '/home' }
];
