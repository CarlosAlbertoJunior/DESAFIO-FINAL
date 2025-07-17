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

  newUser = {
    nome: '',
    sobrenome: '',
    email: '',
    password: '',
    isAdmin: false,
    dataNascimento: '',
    estado: '',
    cidade: '',
    celularWhatsapp: ''
  };

  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
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
      alert('Usuário atualizado com sucesso!');
      this.loadUsers();
      this.selectedUser = null;
    } else {
      alert('Falha ao atualizar o usuário.');
    }
  }

  deleteUser(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      if (this.authService.deleteUser(id)) {
        alert('Usuário excluído com sucesso.');
        this.loadUsers();
        this.selectedUser = null;
      } else {
        alert('Falha ao excluir o usuário.');
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
      alert(`Usuário '${createdUser.nome}' criado com sucesso!`);
      this.loadUsers();
      this.cancel();
      form.resetForm();
    } else {
      alert('Falha ao criar o novo usuário. O e-mail pode já existir.');
    }
  }

  cancel(): void {
    this.selectedUser = null;
    this.isCreatingNewUser = false;
    this.newUser = { nome: '', sobrenome: '', email: '', password: '', isAdmin: false, dataNascimento: '', estado: '', cidade: '', celularWhatsapp: '' };
  }

  // FUNÇÃO ADICIONADA PARA CORRIGIR O ERRO
  updateCnCoins(): void {
    if (this.selectedUser) {
      const totalDoado = Number(this.selectedUser.totalDoado) || 0;
      this.selectedUser.cnCoins = Math.floor(totalDoado / 10);
    }
  }
}
