// src/app/apoiar/apoiar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// NOVO: Tipo para os rankings do LoL
type LolRank = 'ferro' | 'bronze' | 'prata' | 'ouro' | 'platina' | 'esmeralda' | 'diamante';

// Interface para um Apoiador com o novo tipo de ranking
interface Supporter {
  name: string;
  amount: number;
  rank: LolRank;
}

// Interface para os níveis de doação (mantida)
interface DonationTier {
  amount: number;
  title: string;
  description: string;
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


  public pixKey = 'producao@cosnection.com.br';
  public customAmount: number | null = null;
  public selectedTier: DonationTier | null = null;
  public copyButtonText = 'Copiar Chave PIX';
  public supporters: Supporter[] = [];
  public showAllSupporters = false;

  public patrocinioLogos = [
    { url: '/img/APOIO/PSB.png', alt: 'Logo Patrocinador Principal 1' },
    { url: 'assets/img/sponsors/patrocinador2.png', alt: 'Logo Patrocinador Principal 2' },
    { url: 'assets/img/sponsors/patrocinador3.png', alt: 'Logo Patrocinador Principal 3' },
    { url: 'assets/img/sponsors/patrocinador2.png', alt: 'Logo Patrocinador Principal 4' },
    { url: 'assets/img/sponsors/patrocinador3.png', alt: 'Logo Patrocinador Principal 5' },
    { url: 'assets/img/sponsors/patrocinador2.png', alt: 'Logo Patrocinador Principal 6' },
    { url: 'assets/img/sponsors/patrocinador3.png', alt: 'Logo Patrocinador Principal 7' },
  ];

  // NOVA PROPRIEDADE para Apoiadores (parceiros, etc.)
  public apoioLogos = [
    { url: '/img/APOIO/apoio1.png', alt: 'Logo Apoiador 1' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Apoiador 2' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Apoiador 3' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Apoiador 4' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Apoiador 5' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Apoiador 6' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Apoiador 7' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Apoiador 8' },
    { url: '/img/APOIO/apoio.png', alt: 'Logo Apoiador 9' },

  ];
  constructor() { }

  ngOnInit(): void {
    this.loadSupporters();
  }

  // Função para carregar e classificar os apoiadores com os novos rankings
  loadSupporters(): void {
    const supportersData = [
      { name: 'Andressa Carneiro', amount: 10 },
      { name: 'Rafael Santos', amount: 10 },
      { name: 'Chefinho', amount: 60 },
      { name: 'Mireli', amount: 50 },
      { name: 'Elisa Cruz', amount: 500 },
      { name: 'Cloud', amount: 500 },
      { name: 'Loggya', amount: 300 },
      { name: 'Zuza', amount: 10 },


    ];

    this.supporters = supportersData
      .map(supporter => {
        let rank: LolRank;
        if (supporter.amount >= 500) {
          rank = 'diamante';
        } else if (supporter.amount >= 1000) {
          rank = 'esmeralda';
        } else if (supporter.amount >= 500) {
          rank = 'platina';
        } else if (supporter.amount >= 250) {
          rank = 'ouro';
        } else if (supporter.amount >= 100) {
          rank = 'prata';
        } else if (supporter.amount >= 50) {
          rank = 'bronze';
        } else {
          rank = 'ferro';
        }
        return { ...supporter, rank };
      })
      .sort((a, b) => b.amount - a.amount);
  }

  // Função que retorna a classe do ícone para o ranking
  public getIconForRank(rank: LolRank): string {
    const iconMap = {
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

  // Suas outras funções (selectTier, copyPixKey, toggleSupportersView) permanecem as mesmas
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