// src/app/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth'; // Importa o AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit { // Nome da classe corrigido

  loginData = {
    email: '',
    senha: ''
  };

  loginError: string | null = null;
  processandoLogin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Se o usuário já estiver logado, redireciona para o perfil
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/perfil']);
    }
  }

  onSubmit(form: NgForm): void {
    this.loginError = null;
    this.processandoLogin = true;

    if (form.invalid) {
      this.loginError = 'Por favor, preencha todos os campos.';
      this.processandoLogin = false;
      return;
    }

    // --- CORREÇÃO PRINCIPAL AQUI ---
    // Chamamos o método login com um único objeto de credenciais
    const result = this.authService.login({
      email: this.loginData.email,
      password: this.loginData.senha
    });

    // Verificamos o resultado diretamente, sem .subscribe()
    if (result.success) {
      console.log('Login bem-sucedido!');
      // Redireciona para a página correta após o login
      if (this.authService.isAdmin) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/perfil']);
      }
    } else {
      // Se o login falhou, mostra a mensagem de erro retornada pelo serviço
      this.loginError = result.message;
    }

    this.processandoLogin = false;
  }
}
