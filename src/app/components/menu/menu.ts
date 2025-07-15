// src/app/menu/menu.component.ts

import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../auth'; // <--- IMPORTE O AUTHSERVICE AQUI!

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbCollapseModule,
    RouterLink,

    // Não precisa de RouterLink, pois está usando (click) e Router.navigate
  ],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit, OnDestroy {


  isMenuCollapsed = true;
  isScrolled = false;
  routerSubscription: any;

  // Injetamos o AuthService aqui
  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.isMenuCollapsed = true;
      });

    this.checkScroll();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    const scrollThreshold = 50;
    this.isScrolled = window.pageYOffset > scrollThreshold;
  }

  // Seus métodos de navegação existentes
  onCncosplay(): void { this.router.navigate(['/cncosplay']); }
  onCoslovers(): void { this.router.navigate(['/coslovers']); }
  onCoordenacao(): void { this.router.navigate(['/coordenacao']); }
  onEventos(): void { this.router.navigate(['/eventos']); }
  onInscricao(): void { this.router.navigate(['/inscricao']); }
  onContato(): void { this.router.navigate(['/contato']); }
  onApoiar(): void { this.router.navigate(['/apoiar']); }
  onAgenda(): void { this.router.navigate(['/agenda']); }
  onFotos(): void { this.router.navigate(['/fotos']); }
  onSobre(): void { this.router.navigate(['/sobre']); }
  onHome(): void { this.router.navigate(['/home']); }
  onCadastro(): void { this.router.navigate(['/cadastro']); }
  onLogin(): void { this.router.navigate(['/login']); }
  onAdminPanel() {this.router.navigate(['/admin']);
}

  // NOVO MÉTODO para lidar com o clique em 'Sair'
  onLogout(): void {
    this.authService.logout();
    // O AuthService já redireciona para /cadastro após o logout
  }

  // NOVO MÉTODO para navegar para 'Meu Perfil'
  onMeuPerfil(): void {
    this.router.navigate(['/perfil']); // Você precisará criar uma rota para '/perfil' se ainda não o fez
  }
}
