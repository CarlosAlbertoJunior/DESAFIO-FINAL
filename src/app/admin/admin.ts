// src/app/admin/admin.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; // Para o formulário de cadastro/edição
import { AuthService } from '../auth'; // Seu AuthService

// Interface para usuário simulado (deve ser a mesma do AuthService)
interface MockUser {
  id: number;
  nome: string;
  email: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // Importe FormsModule para usar formulários de template
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {

  users: MockUser[] = [];
  selectedUser: MockUser | null = null; // Usuário selecionado para edição
  newUser: { nome: string, email: string, isAdmin: boolean } = { nome: '', email: '', isAdmin: false };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (data: MockUser[]) => { // Tipar o retorno como MockUser[]
        this.users = data;
        this.clearMessages();
      },
      error => {
        this.errorMessage = 'Erro ao carregar usuários.';
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  // === Métodos para Gerenciamento de Usuários ===

  // Selecionar usuário para edição
  selectUserForEdit(user: MockUser): void {
    this.selectedUser = { ...user }; // Cria uma cópia para evitar edição direta na lista
    this.clearMessages();
  }

  // Salvar edições
  saveUserEdit(): void {
    if (this.selectedUser) {
      this.authService.updateUser(this.selectedUser).subscribe(
        success => {
          if (success) {
            this.successMessage = `Usuário '${this.selectedUser?.nome}' atualizado com sucesso!`;
            this.loadUsers(); // Recarrega a lista
            this.selectedUser = null; // Limpa a seleção
          } else {
            this.errorMessage = 'Falha ao atualizar usuário.';
          }
        },
        error => {
          this.errorMessage = 'Erro ao atualizar usuário.';
          console.error('Erro ao atualizar usuário:', error);
        }
      );
    }
  }

  // Deletar usuário
  deleteUser(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.authService.deleteUser(id).subscribe(
        success => {
          if (success) {
            this.successMessage = 'Usuário excluído com sucesso!';
            this.loadUsers(); // Recarrega a lista
          } else {
            this.errorMessage = 'Falha ao excluir usuário.';
          }
        },
        error => {
          this.errorMessage = 'Erro ao excluir usuário.';
          console.error('Erro ao excluir usuário:', error);
        }
      );
    }
  }

  // Cadastrar novo usuário (diretamente do painel admin)
  createNewUser(form: NgForm): void {
    if (form.invalid) {
      this.errorMessage = 'Preencha todos os campos do novo usuário.';
      form.controls['newName']?.markAsTouched();
      form.controls['newEmail']?.markAsTouched();
      form.controls['newIsAdmin']?.markAsTouched();
      return;
    }
    this.authService.createUser(this.newUser).subscribe(
      createdUser => {
        this.successMessage = `Novo usuário '${createdUser.nome}' cadastrado com sucesso!`;
        this.loadUsers(); // Recarrega a lista
        this.newUser = { nome: '', email: '', isAdmin: false }; // Reseta o formulário
        form.resetForm();
      },
      error => {
        this.errorMessage = 'Erro ao cadastrar novo usuário.';
        console.error('Erro ao cadastrar novo usuário:', error);
      }
    );
  }

  clearMessages(): void {
    this.errorMessage = null;
    this.successMessage = null;
  }

  cancelEdit(): void {
    this.selectedUser = null;
    this.clearMessages();
  }
}
