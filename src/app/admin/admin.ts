// src/app/admin/admin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService, User } from '../auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {

  users: User[] = [];
  selectedUser: User | null = null;
  isCreatingNewUser = false;

  // CORREÇÃO: O objeto newUser agora inclui todas as propriedades necessárias
  newUser: Partial<User> & { password?: string } = {
    nome: '',
    email: '',
    password: '',
    isAdmin: false,
    anoConheceu: new Date().getFullYear() // Garante que 'anoConheceu' existe
  };

  anosDisponiveis: number[] = [];
  showNewUserPassword: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
    // Preenche a lista de anos para o formulário de criação
    const anoAtual = new Date().getFullYear();
    for (let ano = anoAtual; ano >= 2010; ano--) {
      this.anosDisponiveis.push(ano);
    }
  }

  loadUsers(): void {
    this.users = this.authService.getUsers();
  }

  selectUserForEdit(user: User): void {
    this.selectedUser = { ...user };
    this.isCreatingNewUser = false;
  }

  saveUserEdit(): void {
    if (!this.selectedUser) return;
    if (this.authService.updateUser(this.selectedUser)) {
      alert('Utilizador atualizado com sucesso!');
      this.loadUsers();
      this.selectedUser = null;
    } else {
      alert('Falha ao atualizar o utilizador.');
    }
  }

  deleteUser(id: number): void {
    if (confirm('Tem a certeza que deseja excluir este utilizador?')) {
      if (this.authService.deleteUser(id)) {
        alert('Utilizador excluído com sucesso.');
        this.loadUsers();
        this.selectedUser = null;
      } else {
        alert('Falha ao excluir o utilizador.');
      }
    }
  }

  showCreateUserForm(): void {
    this.isCreatingNewUser = true;
    this.selectedUser = null;
  }

  createNewUser(form: NgForm): void {
    if (form.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const createdUser = this.authService.createUser(this.newUser);
    if (createdUser) {
      alert(`Utilizador '${createdUser.nome}' criado com sucesso!`);
      this.loadUsers();
      this.cancel();
      form.resetForm();
    } else {
      alert('Falha ao criar o novo utilizador. O e-mail pode já existir.');
    }
  }

  cancel(): void {
    this.selectedUser = null;
    this.isCreatingNewUser = false;
    this.newUser = { nome: '', email: '', password: '', isAdmin: false, anoConheceu: new Date().getFullYear() };
  }

  updateCnCoins(): void {
    if (this.selectedUser) {
      const totalDoado = Number(this.selectedUser.totalDoado) || 0;
      this.selectedUser.cnCoins = Math.floor(totalDoado / 10);
    }
  }
}
