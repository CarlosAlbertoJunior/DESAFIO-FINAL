// src/app/components/whatsapp-button/whatsapp-button.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core'; // Adicione OnInit, OnDestroy
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- IMPORTANTE: Para usar ngModel na caixa de texto

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Adicione FormsModule aqui
  templateUrl: './whatsapp-button.html',
  styleUrls: ['./whatsapp-button.css']
})
export class WhatsappButton implements OnInit, OnDestroy {
  isChatOpen: boolean = false; // Controla a visibilidade da caixa de chat
  userMessage: string = ''; // Armazena a mensagem digitada pelo usuário
  whatsappNumber: string = '5571992676038'; // Seu número WhatsApp com código do país e DDD

  constructor() { }

  ngOnInit(): void {
    // Inicializa a mensagem com algo padrão, se desejar
    this.userMessage = 'Olá! Gostaria de mais informações sobre os eventos da Cosnection.';
  }

  ngOnDestroy(): void {
    // Limpeza se houver subscriptions (neste caso, não há)
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  startChat() {
    if (this.userMessage.trim() === '') {
      alert('Por favor, digite sua mensagem.'); // Ou use uma validação mais elegante
      return;
    }
    // Codifica a mensagem para URL para quebra de linha (%0A) e caracteres especiais
    const encodedMessage = encodeURIComponent(this.userMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${this.whatsappNumber}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank'); // Abre o WhatsApp em uma nova aba
    this.isChatOpen = false; // Fecha a caixa de chat após o envio
    this.userMessage = ''; // Limpa a mensagem (opcional)
  }

  // Opcional: Se quiser que o chat feche ao clicar fora
  // @HostListener('document:click', ['$event'])
  // onClick(event: Event) {
  //   // Verifica se o clique não foi dentro do chatbox ou do botão
  //   // Isso requer ElementRef e ViewChild, para um botão simples é mais complexo
  // }
}
