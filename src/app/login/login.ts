// src/app/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
// Mude a importação para usar o nome correto da classe AuthService
import { AuthService } from '../auth';

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
export class Login implements OnInit {

  loginData = {
    email: '',
    senha: ''
  };

  loginError: string | null = null;
  processandoLogin: boolean = false;

  constructor(
    // Mude de 'private auth: Auth' para 'private authService: AuthService'
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(form: NgForm) {
    this.loginError = null;
    this.processandoLogin = true;

    if (form.invalid) {
      form.controls['email']?.markAsTouched();
      form.controls['senha']?.markAsTouched();
      console.warn('Formulário de login inválido!');
      this.loginError = 'Por favor, preencha todos os campos obrigatórios.';
      this.processandoLogin = false;
      return;
    }

    console.log('Dados de login para envio:', this.loginData);
    let userNameForLogin: string = 'Usuário'; // Padrão
    let userIsAdmin: boolean = false; // Padrão

    if (this.loginData.email === 'admin@cosnection.com.br' && this.loginData.senha === 'Planetalua01#') {
      userNameForLogin = 'Admin';
      userIsAdmin = true; // <--- Certifique-se de que isso é levado em conta se o login for via AuthService diretamente
    }
    // Mantenha a chamada como 'this.authService.login'
    this.authService.login(this.loginData.email, this.loginData.senha, {
      nome: 'Usuário',
      email: this.loginData.email
    }).subscribe(
      // Adicione a tipagem para 'user' e 'error' para evitar avisos do TypeScript (TS7006)
      (user: any) => { // 'any' aqui para simplicidade, mas UserData seria melhor se a interface fosse completa
        console.log('Login bem-sucedido!', user);
        this.router.navigate(['/home']);
      },
      (error: any) => { // 'any' aqui também
        console.error('Erro no login:', error);
        this.loginError = error.message || 'Credenciais inválidas. Tente novamente.';
        this.processandoLogin = false;
      }
    );
  }
}
