// src/app/cos-lovers/cos-lovers.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface para estruturar os dados de cada Cos Lover
interface CosLover {
  name: string;
  selosTitulo: string;
  title: string;
  mainPhotoUrl: string;
  quote: string;
  quoteAuthor?: string;
  selos?: string[]; // <-- Propriedade dos selos adicionada
  socials: {
    instagram?: string;
    twitch?: string;
    twitter?: string;
    facebook?: string; // <-- Sua adição do Facebook mantida
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
  public coslovers: CosLover[] = [
    {
      selosTitulo: 'Selos',
      name: 'Cloud',
      title: 'Produtor Geek, Programador, Músico & Cosplay',
      mainPhotoUrl: '/img/COORDENAÇÃO/cloud.jpg',
      quote: 'A vida sem paixão é uma vida sem propósito.',
      quoteAuthor: 'vikings',
      selos: [
        '/img/COS LOVERS/SELOS/master.png',
        '/img/COS LOVERS/SELOS/juri.png',
        '/img/COS LOVERS/SELOS/1ano.png',
        '/img/COS LOVERS/SELOS/af.png',
        '/img/COS LOVERS/SELOS/ccxp.png',
        '/img/COS LOVERS/SELOS/lbc.png',
        '/img/COS LOVERS/SELOS/museu.png',
        '/img/COS LOVERS/SELOS/top5.png',
        '/img/COS LOVERS/SELOS/wcs.png',
        '/img/COS LOVERS/SELOS/1lugar.png',
        '/img/COS LOVERS/SELOS/5anos.png',
        '/img/COS LOVERS/SELOS/logobranca.png',
        '/img/COS LOVERS/SELOS/10anos.png',

      ],
      socials: {
        twitch: 'https://twitch.tv/cloudincn',
        instagram: 'https://instagram.com/cloud',
        facebook: 'https://facebook.com/cloud',
      },
      galleryUrls: [
        'assets/img/coslovers/gallery/cloud1.jpg',
        'assets/img/coslovers/gallery/cloud2.jpg',
        'assets/img/coslovers/gallery/cloud3.jpg',
      ]
    },
    {
      selosTitulo: 'Selos',
      name: 'Elisa Cruz',
      title: 'Produtora Geek, Administradora, Pulblicitária & Cosplay',
      mainPhotoUrl: 'img/COORDENAÇÃO/Elisa.jpg',
      quote: 'Criando histórias, vivendo sonhos e inspirando o futuro.',
      quoteAuthor: 'Walt Disney',
      selos: [
        '/img/COS LOVERS/SELOS/logobranca.png',
        '/img/COS LOVERS/SELOS/10anos.png',
      ],
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
