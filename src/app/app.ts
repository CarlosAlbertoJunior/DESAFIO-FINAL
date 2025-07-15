import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Módulo comum do Angular (para diretivas como ngIf, ngFor)
import { RouterOutlet } from '@angular/router';
import { Menu } from "./components/menu/menu";
import { Footer } from "./components/footer/footer"; // Necessário para o roteamento do Angular
import { WhatsappButton } from './components/whatsapp-button/whatsapp-button';





@Component({
  selector: 'app-root',     // O seletor HTML que você usará para este componente (ex: <app-root></app-root>)
  standalone: true,         // Indica que este é um componente autônomo (Angular 17+)
  imports: [
    CommonModule,
    RouterOutlet,
    Menu,
    Footer,
    WhatsappButton

],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Cosnection';
}
