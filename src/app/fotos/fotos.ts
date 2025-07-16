// src/app/fotos/fotos.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common'; // Inclua TitleCasePipe
import { RouterLink } from '@angular/router'; // Se precisar de links nas fotos
import { FormsModule } from '@angular/forms'; // Para usar ngModel no filtro

// Interface para o modelo de dados de uma foto
interface Photo {
  id: string;
  url: string; // URL da imagem
  alt: string; // Texto alternativo para acessibilidade
  category: string; // Categoria (ex: 'cosplay', 'eventos', 'lancamentos')
  eventName?: string; // Título do evento (opcional)
  isFeatured?: boolean; // Para fotos em destaque ( Masonry, por exemplo)
}

@Component({
  selector: 'app-fotos',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe], // Adicione TitleCasePipe
  templateUrl: './fotos.html',
  styleUrls: ['./fotos.css']
})
export class Fotos implements OnInit {
  allPhotos: Photo[] = []; // Todas as fotos carregadas (EDITAR AQUI PARA GERENCIAR AS FOTOS)
  filteredPhotos: Photo[] = []; // Fotos após a aplicação do filtro
  categories: string[] = []; // Categorias disponíveis para filtro
  selectedCategory: string = 'all'; // Categoria selecionada no filtro (padrão: todas)

  constructor() { }

  ngOnInit(): void {
    this.loadPhotos(); // Carrega os dados das fotos
    this.extractCategories(); // Extrai categorias únicas para o filtro
    this.applyFilter(); // Aplica o filtro inicial (todas as fotos)
  }

  loadPhotos(): void {
    // ** LISTA DE FOTOS: EDITAR DIRETAMENTE AQUI PARA ADICIONAR, REMOVER OU ALTERAR FOTOS **
    // (Em um cenário real com backend, estes dados viriam de um serviço que chama uma API)
    this.allPhotos = [
      { id: 'p1', url: 'assets/img/galeria/evento1-foto1.jpg', alt: 'Cosplay no Summer Fest', category: 'cosplay', eventName: 'Cosnection Summer Fest' },
      { id: 'p2', url: 'assets/img/galeria/evento1-foto2.jpg', alt: 'Público no palco', category: 'eventos', eventName: 'Cosnection Summer Fest' },
      { id: 'p3', url: 'assets/img/galeria/evento2-foto1.jpg', alt: 'Batalha de Cosplay', category: 'concursos', eventName: 'Batalha de Cosplay' },
      { id: 'p4', url: 'assets/img/galeria/evento2-foto2.jpg', alt: 'Juízes do concurso', category: 'bastidores', eventName: 'Batalha de Cosplay' },
      { id: 'p5', url: 'assets/img/galeria/evento3-foto1.jpg', alt: 'Artista desenhando', category: 'artistas', eventName: 'Geek Conecta' },
      { id: 'p6', url: 'assets/img/galeria/evento3-foto2.jpg', alt: 'Pessoas em painel', category: 'eventos', eventName: 'Geek Conecta' },
      { id: 'p7', url: 'assets/img/galeria/evento4-foto1.jpg', alt: 'Fantasia de Halloween', category: 'cosplay', eventName: 'Halloween Party' },
      { id: 'p8', url: 'assets/img/galeria/evento4-foto2.jpg', alt: 'Decoração de festa', category: 'eventos', eventName: 'Halloween Party' },
      // { id: 'p9', url: 'assets/img/galeria/lancamento-filme1.jpg', alt: 'Cosplay de Super-Herói', category: 'lancamentos', eventName: 'Lançamento Super Filme', isFeatured: true }, // Exemplo de foto em destaque
      // { id: 'p10', url: 'assets/img/galeria/lancamento-filme2.jpg', alt: 'Público no cinema', category: 'lancamentos', eventName: 'Lançamento Super Filme' },
      // { id: 'p11', url: 'assets/img/galeria/evento5-foto1.jpg', alt: 'Torneio de games', category: 'games', eventName: 'Torneio Gamer' },
      // { id: 'p12', url: 'assets/img/galeria/evento5-foto2.jpg', alt: 'Stands variados', category: 'eventos', eventName: 'Feira Geek' },
      // Adicione mais fotos aqui seguindo o formato!
    ];
  }

  extractCategories(): void {
    const uniqueCategories = new Set(this.allPhotos.map(photo => photo.category));
    this.categories = ['all', ...Array.from(uniqueCategories)]; // Adiciona 'all' no início para o filtro
  }

  applyFilter(): void {
    if (this.selectedCategory === 'all') {
      this.filteredPhotos = this.allPhotos;
    } else {
      this.filteredPhotos = this.allPhotos.filter(photo => photo.category === this.selectedCategory);
    }
  }

  // --- Funções Futuras (Lightbox, etc.) ---
  openLightbox(photo: Photo): void {
    console.log('Abrir lightbox para:', photo.url);
    // Aqui você integraria a lógica para abrir um modal ou componente de lightbox
    // e passar a foto selecionada.
  }
}