// src/app/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  processandoLogin = false;

  // NOVA PROPRIEDADE para controlar a visibilidade
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

    const result = this.authService.login({
      email: this.loginData.email,
      password: this.loginData.senha
    });

    if (result.success) {
      if (this.authService.isAdmin) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/perfil']);
      }
    } else {
      this.loginError = result.message;
    }

    this.processandoLogin = false;
  }
}
