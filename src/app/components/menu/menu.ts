// src/app/menu/menu.component.ts
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core'; // Adicione HostListener, OnInit, OnDestroy
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbCollapseModule
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'] // Use styleUrls para consistência
})
export class Menu implements OnInit, OnDestroy { // Renomeado para MenuComponent para seguir convenções

  isMenuCollapsed = true;
  isScrolled = false; // Nova variável para controlar o estado da rolagem
  routerSubscription: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Lógica existente para fechar o menu ao navegar
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.isMenuCollapsed = true;
      });

    // Inicializa o estado de rolagem na carga da página
    this.checkScroll();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    // Não é necessário remover o HostListener manualmente; o Angular faz isso.
  }

  // HostListener para detectar eventos de rolagem na janela
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    // Define o limite de rolagem (ex: 50 pixels) para o menu diminuir
    const scrollThreshold = 50; // Ajuste este valor conforme necessário
    this.isScrolled = window.pageYOffset > scrollThreshold;
  }

  // Seus métodos de navegação existentes
  onCncosplay(): void {
    this.router.navigate(['/cncosplay']);
  }
  onCoslovers(): void {
    this.router.navigate(['/coslovers']);
  }
  onCoordenacao(): void {
    this.router.navigate(['/coordenacao']);
  }
  onEventos(): void {
    this.router.navigate(['/eventos']);
  }
  onInscricao(): void {
    this.router.navigate(['/inscricao']);
  }
  onContato(): void {
    this.router.navigate(['/contato']);
  }
  onApoiar(): void {
    this.router.navigate(['/apoiar']);
  }
  onAgenda(): void {
    this.router.navigate(['/agenda']);
  }
  onFotos(): void {
    this.router.navigate(['/fotos']);
  }
  onSobre(): void {
    this.router.navigate(['/sobre']);
  }
  onHome(): void {
    this.router.navigate(['/home']);
  }
}
