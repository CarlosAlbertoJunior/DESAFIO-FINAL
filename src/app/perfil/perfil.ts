// src/app/perfil/perfil.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf, *ngFor
import { RouterLink } from '@angular/router'; // Para o link de voltar à home
import { AuthService } from '../auth'; // Importe o AuthService para pegar dados do usuário

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink // Para usar routerLink no template
  ],
  template: `
    <div class="container my-5">
      <div class="card p-5 shadow-lg bg-light text-center">
        <h2 class="mb-4">Olá, {{ authService.currentUser?.nome || 'Usuário' }}!</h2>
        <p class="lead">Esta é a sua página de perfil.</p>
        <p *ngIf="authService.currentUser">
          Seu e-mail cadastrado é: <strong>{{ authService.currentUser.email }}</strong>
        </p>
        <p>Aqui você poderá visualizar e editar suas informações pessoais no futuro.</p>
        <button class="btn btn-secondary mt-3" [routerLink]="['/home']">Voltar para a Home</button>
      </div>
    </div>
  `,
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {

  constructor(public authService: AuthService) { } // Injeta o AuthService

  ngOnInit(): void {
    // Lógica adicional pode ser adicionada aqui, como carregar dados do perfil do backend
  }
}
