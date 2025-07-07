
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,
    NgbDropdownModule, NgbCollapseModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  isMenuCollapsed = true
  routerSubscription: any;
  constructor(private router: Router) { }
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
  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(
        // Filtra para reagir apenas quando uma navegação for concluída com sucesso
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        // Define isMenuCollapsed para true para fechar o menu após a navegação
        this.isMenuCollapsed = true;
      });
  }
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
