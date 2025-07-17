// src/app/apoiar/apoiar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces
type LolRank = 'ferro' | 'bronze' | 'prata' | 'ouro' | 'platina' | 'esmeralda' | 'diamante';

interface Supporter {
  name: string;
  amount: number;
  rank: LolRank;
}

interface DonationTier {
  amount: number;
  title: string;
  description: string;
}

interface Logo {
  url: string;
  alt: string;
  linkUrl: string;
}

@Component({
  selector: 'app-apoiar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './apoiar.html',
  styleUrls: ['./apoiar.css']
})
export class Apoiar implements OnInit {

  public donationTiers: DonationTier[] = [
    { amount: 10, title: 'Apoio Ferro', description: 'Ajuda a trazer um artista convidado.' },
    { amount: 50, title: 'Apoio Bronze', description: 'Ajuda a cobrir os custos de materiais.' },
    { amount: 100, title: 'Apoio Prata', description: 'Garante a premiação de um concurso.' },
    { amount: 250, title: 'Apoio Ouro', description: 'Contribui para a estrutura de som.' },
    { amount: 500, title: 'Apoio Platina', description: 'Ajuda a trazer um artista convidado.' },
    { amount: 1000, title: 'Apoio Diamante', description: 'Ajuda a trazer um artista convidado.' }
  ];

  public pixKey = '47.695.537/0001-87';
  public customAmount: number | null = null;
  public selectedTier: DonationTier | null = null;
  public copyButtonText = 'Copiar Chave PIX';
  public supporters: Supporter[] = [];
  public showAllSupporters = false;

  public metaDoacao: number = 10000;
  public valorArrecadado: number = 0;
  public porcentagemProgresso: number = 0;

  public patrocinioLogos: Logo[] = [
    { url: '/img/APOIO/PSBColor.png', alt: 'Logo Governo da Bahia', linkUrl: 'https://www.psbba.org.br/' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Patrocinador Principal 2', linkUrl: '#' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Patrocinador Principal 3', linkUrl: '#' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Patrocinador Principal 4', linkUrl: '#' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Patrocinador Principal 5', linkUrl: '#' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Patrocinador Principal 6', linkUrl: '#' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Patrocinador Principal 7', linkUrl: '#' },
  ];

  public apoioLogos: Logo[] = [
    { url: '/img/APOIO/loggya.png', alt: 'Logo Apoiador Loggya', linkUrl: 'https://www.instagram.com/loggya.store/'},
    { url: '/img/APOIO/gatoa.PNG', alt: 'Logo Apoiador Gatoa', linkUrl: 'https://www.instagram.com/gatoa.store' },
    { url: '/img/APOIO/crazy.jpg', alt: 'Logo Apoiador Crazy Animes', linkUrl: 'https://www.instagram.com/crazyanimesoficial/' },
    { url: '/img/APOIO/cosplayart.png', alt: 'Logo Apoiador Cosplay Art', linkUrl: 'https://www.instagram.com/cosplayartbr' },
    { url: '/img/APOIO/cloudin.png', alt: 'Logo Apoiador Cloudin', linkUrl: 'https://www.twitch.tv/cloudincn' },
    { url: '/img/APOIO/person.png', alt: 'Logo Apoiador Person Art', linkUrl: 'https://www.instagram.com/personartbrindes/' },
    { url: '/img/APOIO/Bond.png', alt: 'Logo Apoiador Bonde dos Miranha', linkUrl: 'https://www.instagram.com/bondedosmiranhaba/' },

  ];

  constructor() { }

  ngOnInit(): void {
    this.loadSupporters();
  }

  loadSupporters(): void {
    const supportersData = [
      { name: 'Andreza Carneiro', amount: 10 },
      { name: 'Rafael Santos', amount: 10 },
      { name: 'Chefinhodzaum', amount: 60 },
      { name: 'Mireli', amount: 70 },
      { name: 'Elisa Cruz', amount: 635 },
      { name: 'Cloud', amount: 635 },
      { name: 'Loggya', amount: 300 },
      { name: 'Zuza', amount: 10 },
    ];

    this.supporters = supportersData
      .map(supporter => {
        let rank: LolRank;
        // Lógica de ranking na ordem correta (do maior para o menor)
        if (supporter.amount >= 1000) {
          rank = 'diamante';
        } else if (supporter.amount >= 500) {
          rank = 'esmeralda';
        } else if (supporter.amount >= 250) {
          rank = 'platina';
        } else if (supporter.amount >= 100) {
          rank = 'ouro';
        } else if (supporter.amount >= 50) {
          rank = 'prata';
        } else if (supporter.amount >= 10) {
          rank = 'bronze';
        } else {
          rank = 'ferro';
        }
        return { ...supporter, rank };
      })
      .sort((a, b) => b.amount - a.amount);

    this.calcularProgresso();
  }

  calcularProgresso(): void {
    this.valorArrecadado = this.supporters.reduce((total, supporter) => total + supporter.amount, 0);
    const progresso = (this.valorArrecadado / this.metaDoacao) * 100;
    this.porcentagemProgresso = Math.min(progresso, 100);
  }

  public getIconForRank(rank: LolRank): string {
    const iconMap: { [key in LolRank]: string } = {
      diamante: 'bi-gem',
      esmeralda: 'bi-triangle-half',
      platina: 'bi-shield-shaded',
      ouro: 'bi-star-fill',
      prata: 'bi-award-fill',
      bronze: 'bi-shield-fill',
      ferro: 'bi-square-fill'
    };
    return iconMap[rank] || 'bi-heart-fill';
  }

  selectTier(tier: DonationTier) {
    this.selectedTier = tier;
    this.customAmount = null;
  }

  copyPixKey() {
    navigator.clipboard.writeText(this.pixKey).then(() => {
      this.copyButtonText = 'Copiado!';
      setTimeout(() => { this.copyButtonText = 'Copiar Chave PIX'; }, 2000);
    });
  }

  toggleSupportersView(): void {
    this.showAllSupporters = !this.showAllSupporters;
  }
}
