// src/app/fotos/fotos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

export interface Album {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  photos: string[];
  driveUrl?: string;
}

@Component({
  selector: 'app-fotos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fotos.html',
  styleUrls: ['./fotos.css']
})
export class Fotos implements OnInit {

  public albums: Album[] = [];
  public selectedAlbum: Album | null = null;
  private albumModal: Modal | null = null;

  // Variáveis para controlar a visualização dentro do modal
  public modalView: 'grid' | 'single' = 'grid';
  public singlePhotoUrl: string | null = null;

  constructor() { }

  ngOnInit(): void {
    this.loadAlbums();
  }

  loadAlbums(): void {
    // Sua lista de álbuns atualizada
    this.albums = [
      {
        id: 'album1',
        title: 'Ferias Geek',
        description: 'Os melhores momentos do nosso evento de férias.',
        coverImage: '/img/FOTOS/FeriasGeek/294-IMG_2388.jpg',
        driveUrl: 'https://drive.google.com/drive/folders/1I-Q9nZCx0wXdKyfsaVnviC7GwiLXehB4',
        photos: [
          // SUGESTÃO: Incluir a foto de capa aqui também!
          '/img/FOTOS/FeriasGeek/294-IMG_2388.jpg',
          '/img/FOTOS/FeriasGeek/4-IMG_1634.jpg',
          '/img/FOTOS/FeriasGeek/6-IMG_1637.jpg',
          '/img/FOTOS/FeriasGeek/62-IMG_1837.jpg',
          '/img/FOTOS/FeriasGeek/69-IMG_1849.jpg',
          '/img/FOTOS/FeriasGeek/241-IMG_2232.jpg',
          '/img/FOTOS/FeriasGeek/197-IMG_2133.jpg',
          '/img/FOTOS/FeriasGeek/210-IMG_2163.jpg',
          '/img/FOTOS/FeriasGeek/225-IMG_2202.jpg',

        ]
      },
      {
        id: 'album2',
        title: 'BSC Geek 2º Edição',
        description: 'Competidores a todo vapo em nossa segunda edição.',
        coverImage: 'img/FOTOS/BSCgeek/PCOC0735.JPG',
        driveUrl: 'https://drive.google.com/drive/folders/1sEMsG1kxciWaSr0T1ayKGz6_Q9TePU_G',
        photos: [
          '/img/FOTOS/BSCgeek/PCOC0295.JPG',
          '/img/FOTOS/BSCgeek/PCOC0471.JPG',
          '/img/FOTOS/BSCgeek/PCOC0609.JPG',
          '/img/FOTOS/BSCgeek/PCOC0735.JPG',
          '/img/FOTOS/BSCgeek/PCOC9734.JPG',
          '/img/FOTOS/BSCgeek/PCOC9697.JPG',
          '/img/FOTOS/BSCgeek/PCOC9767.JPG',
          '/img/FOTOS/BSCgeek/PCOC9808.JPG',
          '/img/FOTOS/BSCgeek/PCOC9949.JPG',
        ]
      },
      {
        id: 'album3',
        title: 'CARNA Wild',
        description: 'Painéis, brindes, poros e uma grande final.',
        coverImage: '/img/FOTOS/Carnawild/PCOC6011.JPG',
        driveUrl: 'https://drive.google.com/drive/folders/1_GfNqxl-ARR5bFMflJRzuiyZrvycqVVU',
        photos: [
          '/img/FOTOS/Carnawild/PCOC5883.JPG',
          '/img/FOTOS/Carnawild/PCOC5684.JPG',
          '/img/FOTOS/Carnawild/PCOC5843.JPG',
          '/img/FOTOS/Carnawild/PCOC5633.JPG',
          '/img/FOTOS/Carnawild/PCOC5645.JPG',
          '/img/FOTOS/Carnawild/PCOC6031.JPG',
          '/img/FOTOS/Carnawild/PCOC6011.JPG',
          '/img/FOTOS/Carnawild/PCOC5705.JPG',
          '/img/FOTOS/Carnawild/PCOC5805.JPG',
        ]
      },
      {
        id: 'album4',
        title: 'Orgulho Geek 5ª Edição',
        description: 'Comemorando os 10 anos da cosnection, com todo glamor!',
        coverImage: '/img/FOTOS/Orgulhogeek/@orgulho geek dia2_1654.jpg',
        driveUrl: 'https://drive.google.com/drive/folders/1Nf5z9-PwFh5Vihs8mvp9GlbkcYa5N0nj',
        photos: [
          'img/FOTOS/Orgulhogeek/@orgulho geek dia1_272.jpg',
          'img/FOTOS/Orgulhogeek/@orgulho geek dia1_949.jpg',
          'img/FOTOS/Orgulhogeek/@orgulho geek dia2_260.jpg',
           'img/FOTOS/Orgulhogeek/@orgulho geek dia2_425.jpg',
          'img/FOTOS/Orgulhogeek/@orgulho geek dia2_448.jpg',
          'img/FOTOS/Orgulhogeek/@orgulho geek dia2_472.jpg',
           'img/FOTOS/Orgulhogeek/@orgulho geek dia2_626.jpg',
          'img/FOTOS/Orgulhogeek/@orgulho geek dia2_712.jpg',
          'img/FOTOS/Orgulhogeek/@orgulho geek dia2_1654.jpg',
        ]
      },
       {
        id: 'album3',
        title: 'CosDay ',
        description: 'Em comemoração ao dia do cosplay - 2024.',
        coverImage: 'img/FOTOS/Cosday/DSC00474.jpg',
        // driveUrl: 'https://drive.google.com/drive/folders/1_GfNqxl-ARR5bFMflJRzuiyZrvycqVVU',
        photos: [
          'img/FOTOS/Cosday/DSC00316.jpg',
          'img/FOTOS/Cosday/DSC00386.jpg',
          'img/FOTOS/Cosday/DSC00358.jpg',
          'img/FOTOS/Cosday/DSC00474.jpg',
          'img/FOTOS/Cosday/DSC00452.jpg',
          'img/FOTOS/Cosday/DSC00297.jpg',
          'img/FOTOS/Cosday/DSC00333.jpg',
          'img/FOTOS/Cosday/DSC00524.jpg',
          'img/FOTOS/Cosday/DSC00375.jpg',
        ]
      },
      {
        id: 'album4',
        title: 'Halloween',
        description: 'Fantasias assustadoras e decoração temática.',
        coverImage: '/img/FOTOS/Halloween/PCOC8455.jpg',
          // driveUrl: 'https://drive.google.com/drive/folders/1_GfNqxl-ARR5bFMflJRzuiyZrvycqVVU',
        photos: [
          '/img/FOTOS/Halloween/PCOC8455.jpg',
          '/img/FOTOS/Halloween/PCOC6797.jpg',
          '/img/FOTOS/Halloween/PCOC6815.jpg',
          '/img/FOTOS/Halloween/PCOC6864.jpg',
          '/img/FOTOS/Halloween/PCOC6993.jpg',
          '/img/FOTOS/Halloween/PCOC7061.jpg',
          '/img/FOTOS/Halloween/PCOC7315.jpg',
          '/img/FOTOS/Halloween/PCOC7408.jpg',
          '/img/FOTOS/Halloween/PCOC7448.jpg',
        ]
      }
      // Removi os álbuns duplicados que estavam aqui
    ];
  }

  public openAlbumModal(album: Album, modalElement: HTMLElement): void {
    this.selectedAlbum = album;
    this.modalView = 'grid'; // Sempre reseta para a visão de grade
    this.singlePhotoUrl = null;

    modalElement.addEventListener('hidden.bs.modal', () => {
      this.modalView = 'grid';
    }, { once: true });

    // Reutiliza a instância do modal se ela já existir
    if (!this.albumModal) {
        this.albumModal = new Modal(modalElement);
    }
    this.albumModal.show();
  }

  // Funções para alternar a visualização no modal
  public showSinglePhoto(photoUrl: string): void {
    this.singlePhotoUrl = photoUrl;
    this.modalView = 'single';
  }

  public showGridView(): void {
    this.modalView = 'grid';
  }
}
