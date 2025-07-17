// src/app/perfil/perfil.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth'; // Importamos o AuthService e a interface User

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    CommonModule
  ],
  // O template foi movido para um arquivo separado (perfil.html) por organização,
  // mas você pode manter inline se preferir.
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit { // Nome da classe corrigido para o padrão

  // Variável local para armazenar os dados do usuário logado
  currentUser: User | null = null;

  // Injetamos o AuthService e o Router
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Ao iniciar o componente, nos "inscrevemos" para receber as informações do usuário
    // e as guardamos na nossa variável local 'currentUser'.
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  // Função para fazer logout
  logout(): void {
    this.authService.logout();
  }
}
