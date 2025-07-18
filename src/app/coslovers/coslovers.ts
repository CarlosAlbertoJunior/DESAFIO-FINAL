// src/app/cos-lovers/cos-lovers.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface para estruturar os dados de cada Cos Lover
interface CosLover {
  name: string;
  title: string;
  mainPhotoUrl: string;
  quote: string;
  quoteAuthor?: string; // <-- NOVA PROPRIEDADE (opcional)
  socials: {
    instagram?: string;
    twitch?: string;
    twitter?: string;
    facebook?: string;
  };
  galleryUrls: string[];
}

@Component({
  selector: 'app-cos-lovers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coslovers.html',
  styleUrls: ['./coslovers.css']
})
export class Coslovers implements OnInit {

  // Lista com os Cos Lovers. Preencha com os dados reais.
  public cosLovers: CosLover[] = [
    {
      name: 'Cloud',
      title: 'Fundador & Cosplayer',
      mainPhotoUrl: 'assets/img/coslovers/cloud.jpg',
      quote: 'A vida sem propósito é uma vida sem sentido.',
      quoteAuthor: 'The Flash', // <-- AUTOR ADICIONADO
      socials: {
        twitch: 'https://twitch.tv/cloudincn',
        instagram: 'https://instagram.com/cloud',
        facebook: 'https://instagram.com/cloud',
      },
      galleryUrls: [
        'assets/img/coslovers/gallery/cloud1.jpg',
        'assets/img/coslovers/gallery/cloud2.jpg',
        'assets/img/coslovers/gallery/cloud3.jpg',
      ]
    },
    {
      name: 'Elisa Cruz',
      title: 'Apresentadora & Cosplayer',
      mainPhotoUrl: 'assets/img/coslovers/elisa.jpg',
      quote: 'Criando histórias, vivendo sonhos e inspirando o futuro.',
      quoteAuthor: 'Walt Disney', // <-- AUTOR ADICIONADO
      socials: {
        instagram: 'https://instagram.com/elisacruz',
        twitter: 'https://twitter.com/elisacruz'
      },
      galleryUrls: [
        'assets/img/coslovers/gallery/elisa1.jpg',
        'assets/img/coslovers/gallery/elisa2.jpg',
      ]
    },
    // Adicione os outros Cos Lovers aqui
  ];

  // Variáveis para controlar o modal
  public selectedLover: CosLover | null = null;
  public isModalVisible = false;

  constructor() { }

  ngOnInit(): void { }

  openLoverModal(lover: CosLover): void {
    this.selectedLover = lover;
    this.isModalVisible = true;
  }

  closeLoverModal(): void {
    this.isModalVisible = false;
    setTimeout(() => {
      this.selectedLover = null;
    }, 300);
  }
}
