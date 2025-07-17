// src/app/cadastro/cadastro.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Importe o Router para o redirecionamento
import { AuthService } from '../auth'; // Importe o nosso AuthService

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class Cadastro implements OnInit { // Nome da classe corrigido

  formData = {
    nome: '',
    sobrenome: '',
    dataNascimento: '',
    estado: '',
    cidade: '',
    email: '',
    celularWhatsapp: '',
    senha: '',
    repetirSenha: '',
    lgpdAceita: false
  };

  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  processandoCadastro: boolean = false;
  cadastroError: string | null = null; // Para mensagens de erro
  cadastroSucesso: any;

  // Injetamos o AuthService e o Router no construtor
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm): void {
    this.cadastroError = null; // Limpa erros anteriores

    if (form.invalid) {
      console.warn('Formulário inválido!');
      this.cadastroError = 'Por favor, corrija os campos destacados.';
      return;
    }

    if (!this.formData.lgpdAceita) {
      this.cadastroError = 'É necessário aceitar os termos da LGPD para prosseguir.';
      return;
    }

    if (this.formData.senha !== this.formData.repetirSenha) {
      this.cadastroError = 'As senhas não coincidem.';
      return;
    }

    this.processandoCadastro = true;

    // --- CORREÇÃO PRINCIPAL AQUI ---
    // Removemos o setTimeout e chamamos o AuthService de verdade

    // Preparamos os dados para o serviço
    const userData = {
      nome: `${this.formData.nome} ${this.formData.sobrenome}`,
      email: this.formData.email,
      password: this.formData.senha
    };

    // Chamamos o método de registro do nosso serviço
    const result = this.authService.register(userData);

    // Verificamos o resultado da operação
    if (result.success) {
      // SUCESSO! O AuthService já fez o login automático.
      // Agora só precisamos redirecionar o usuário para o perfil.
      console.log('Cadastro e login automático realizados. Redirecionando...');
      this.router.navigate(['/perfil']);
    } else {
      // Se o registro falhou (ex: e-mail já existe), mostramos o erro.
      this.cadastroError = result.message;
    }

    this.processandoCadastro = false;
  }
}
