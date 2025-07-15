// src/app/cadastro/cadastro.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cadastro.html', // Verifique se o nome do arquivo HTML está correto
  styleUrls: ['./cadastro.css'] // Verifique se o nome do arquivo CSS está correto
})
export class Cadastro implements OnInit {

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
    lgpdAceita: false // <-- Nova propriedade para o consentimento LGPD
  };

  estados: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  processandoCadastro: boolean = false;
  cadastroSucesso: boolean = false; // <-- Nova propriedade para controlar a mensagem de sucesso

  constructor() { }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    this.cadastroSucesso = false; // Reseta a mensagem de sucesso a cada tentativa de submissão

    if (form.invalid) {
      // Marca campos como 'touched' para exibir feedback de validação
      form.controls['nome']?.markAsTouched();
      form.controls['sobrenome']?.markAsTouched();
      form.controls['email']?.markAsTouched();
      form.controls['senha']?.markAsTouched();
      form.controls['repetirSenha']?.markAsTouched();
      form.controls['lgpdAceita']?.markAsTouched(); // Marca o LGPD como tocado

      console.warn('Formulário inválido! Por favor, corrija os erros.');
      return;
    }

    // Validação LGPD
    if (!this.formData.lgpdAceita) {
      alert('É necessário aceitar os termos da LGPD para prosseguir.');
      return;
    }

    // Validação de senhas personalizada
    if (this.formData.senha !== this.formData.repetirSenha) {
      alert('Erro: As senhas não coincidem!');
      form.controls['repetirSenha']?.setErrors({ 'mismatch': true });
      return;
    }

    this.processandoCadastro = true;

    console.log('Dados do formulário para envio:', this.formData);

    // Simulação de chamada de API e login automático
    setTimeout(() => {
      console.log('Cadastro simulado concluído!');
      // Não usamos mais alert() aqui!
      this.cadastroSucesso = true; // Exibe a mensagem de sucesso na página
      this.processandoCadastro = false;
      form.resetForm(); // Limpa o formulário

      // Se houver uma lógica de login automático e redirecionamento, ela viria aqui.
      // Exemplo: this.router.navigate(['/home']);

    }, 2000);
  }
}
