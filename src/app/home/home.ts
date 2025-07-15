// src/app/home/home.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; // Remova AfterViewInit, ElementRef, ViewChild se não forem usados para outra coisa
import { Carocel } from "../components/carocel/carocel";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Carocel],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
// Remova `implements AfterViewInit`
export class Home { // Classe mais limpa, sem a lógica de rolagem de imagem

  constructor(private router: Router, /* adicione public authService: AuthService se estiver usando-o para mostrar dados do usuário logado */) { }

  onCoordenacao() {
    this.router.navigate(['/coordenacao']);
  }

  // TODA A LÓGICA DE ROLAGEM DE IMAGEM ABAIXO FOI REMOVIDA
  // (Ex: @ViewChild, image1Top, calculateAndSetImagePosition, onMouseEnter, onMouseLeave)
  // Pois o efeito de rolagem é agora gerenciado exclusivamente pelo CSS.
  // Mantenha apenas a lógica de navegação e outras funcionalidades não relacionadas à rolagem.
}
