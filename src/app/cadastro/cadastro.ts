// src/app/cadastro/cadastro.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class Cadastro implements OnInit {

  formData = {
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    repetirSenha: '',
    celularWhatsapp: '',
    anoConheceu: null as number | null,
    lgpdAceita: false
    // ... outros campos que possa ter
  };

  // NOVAS PROPRIEDADES para controlar a visibilidade
  showPassword = false;
  showRepeatPassword = false;

  anosDisponiveis: number[] = [];
  processandoCadastro = false;
  cadastroError: string | null = null;
  cadastroSucesso = false;
  nomeField: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const anoAtual = new Date().getFullYear();
    for (let ano = anoAtual; ano >= 2010; ano--) {
      this.anosDisponiveis.push(ano);
    }
  }

  onSubmit(form: NgForm): void {
    this.cadastroError = null;
    this.cadastroSucesso = false;
    if (form.invalid || !this.formData.anoConheceu) {
      this.cadastroError = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }
    if (this.formData.senha !== this.formData.repetirSenha) {
      this.cadastroError = 'As senhas não coincidem.';
      return;
    }

    this.processandoCadastro = true;
    const result = this.authService.register(this.formData);

    if (result.success) {
      this.router.navigate(['/perfil']);
    } else {
      this.cadastroError = result.message;
    }
    this.processandoCadastro = false;
  }
}
