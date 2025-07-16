import { Component, HostListener, OnInit } from '@angular/core';
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
export class App implements OnInit {
  title = 'cosnection-site';

  // 1. Crie uma propriedade para controlar a visibilidade
  public isDesktop: boolean;

  constructor() {
    // Inicializa a propriedade com o valor atual da tela
    this.isDesktop = window.innerWidth > 991;
  }

  ngOnInit() {
    // Garante que a verificação seja feita ao carregar
    this.checkScreenWidth();
  }

  // 2. Crie um listener para o evento de redimensionar a tela
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  // 3. Crie o método que faz a verificação
  private checkScreenWidth() {
    // Define isDesktop como 'true' apenas se a tela for maior que 991px
    this.isDesktop = window.innerWidth > 991;
  }
}
