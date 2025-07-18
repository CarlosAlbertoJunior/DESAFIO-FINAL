// src/app/perfil/perfil.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa o FormsModule
import { Router } from '@angular/router';
import { AuthService, User } from '../auth';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adiciona o FormsModule
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {
  currentUser: User | null = null;
  isEditing = false;
  editableUser: Partial<User> = {};
  showPassword = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  // --- Funções para os Selos de Lealdade ---
  getSeloIcon(selo: string): string {
    if (!selo) return 'bi-question-circle';
    const icons: { [key: string]: string } = {
      'Bronze': 'bi-shield-fill',
      'Ruby': 'bi-suit-diamond-fill',
      'Dourada': 'bi-star-fill',
      'Esmeralda': 'bi-gem'
    };
    return icons[selo] || '';
  }

  getSeloClass(selo: string): string {
    if (!selo) return '';
    return 'selo-' + selo.toLowerCase();
  }

  // --- Funções para o Modo de Edição ---
  startEditing(): void {
    // Cria uma cópia dos dados atuais para o formulário de edição
    this.editableUser = { ...this.currentUser };
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  saveProfile(): void {
    if (this.currentUser) {
      // Mescla os dados editados com os dados do utilizador atual
      const updatedUser = { ...this.currentUser, ...this.editableUser } as User;

      if (this.authService.updateUser(updatedUser)) {
        alert('Perfil atualizado com sucesso!');
        this.isEditing = false;
      } else {
        alert('Ocorreu um erro ao atualizar o perfil.');
      }
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
