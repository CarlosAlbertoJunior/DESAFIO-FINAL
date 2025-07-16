// src/app/event.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Necessário para injeção, mesmo em simulação
import { Observable, of, throwError } from 'rxjs';
import { EventItem } from './models/event.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:3000/api/events'; // URL de placeholder para simulação

  // ** EDITE A AGENDA AQUI: ALTERE, ADICIONE OU REMOVA OBJETOS DE EVENTO NESTE ARRAY **
  private mockEvents: EventItem[] = [
    {
      id: 'evt001',
      title: 'COSDAY',
      date: '27/07/2025',
      time: '13:00 - 19:00',
      location: 'Parque Shopping Bahia - Lauro de Freitas/BA',
      description: 'Em comemoração ao dia do cosplay, o Parque shopping Bahia e a Cosnection prepararam um mega evento para todos os amantes da cultura geek!!',
      image: 'assets/img/agenda/summer-fest.jpg', // Certifique-se de que a imagem existe!
      status: 'upcoming',
      link: 'https://www.instagram.com/p/DLay3gRvS1L/'
    },
    {
      id: 'evt002',
      title: 'HALLOWEEN CN',
      date: '01/09/2025',
      time: '13:00 - 20:30',
      location: 'Parque Shopping Bahia - Lauro de Freitas/BA',
      description: 'Prepare seu melhor cosplay para o nosso concurso temático. Prêmios incríveis te esperam!',
      image: 'assets/img/agenda/batalha-cosplay.jpg',
      status: 'upcoming',
      // link: 'https://www.instagram.com/cosnection'
    },
    {
      id: 'evt003',
      title: 'ORGULHO GEEK 5ª Edição',
      date: '10/11/2024',
      time: '09:00 - 19:00',
      location: 'Parque Shopping Bahia - Lauro de Freitas/BA',
      description: 'Um dia inteiro de painéis, workshops, feira de artistas e muito networking geek. Não perca!',
      image: '/img/AGENDA/@orgulho geek dia2_1435.jpg',
      status: 'past',
      link: 'https://www.instagram.com/p/DKNikE4BVu4/'
    },
    {
      id: 'evt004',
      title: 'CARNA WILD',
      date: '27/02/2025',
      time: '14:00 - 20:00',
      location: 'Parque Shopping Bahia - Lauro de Freitas/BA',
      description: 'Beleza, Brasil— vamos FESTEJAR! O CarnaWild está chegando ao League of Legends: Wild Rift e trazendo desafios incríveis, recompensas incríveis e muitas vibes de Carnaval.',
      image: '/img/AGENDA/PCOC6006.JPG',
      status: 'past',
      link: 'https://www.instagram.com/p/DHPOlcApm70/?img_index=1'
    },
    {
      id: 'evt004',
      title: 'OSCAR DAY',
      date: '13/12/2024',
      time: '14:00 - 20:00',
      location: 'Parque Shopping Bahia - Lauro de Freitas/BA',
      description: 'Nossa festa temática de Halloween com muitos cosplays de terror e fantasia. Venha fantasiado!',
      image: '/img/AGENDA/Proposta Coca Cola - 2025.jpg',
      status: 'past',
      // link: 'https://www.instagram.com/cosnection'
    }
    // ADICIONE MAIS EVENTOS AQUI SE DESEJAR:
    // {
    //   id: 'evt005',
    //   title: 'Novo Evento de Teste',
    //   date: '20/07/2025',
    //   time: '16:00',
    //   location: 'Online',
    //   description: 'Um evento novo para testar a adição.',
    //   image: 'assets/img/agenda/novo-evento.jpg',
    //   status: 'upcoming',
    //   link: '#'
    // }
  ];
  private nextIdCounter: number = this.mockEvents.length + 1; // Contador para novos IDs simulados

  constructor(private http: HttpClient) { } // HttpClient é injetado, mas não usado diretamente para os métodos mockados

  getEvents(): Observable<EventItem[]> {
    // Retorna uma CÓPIA dos mockEvents para a página de agenda
    return of(this.mockEvents.map(event => ({ ...event })));
  }

  // Os métodos abaixo (getEventById, createEvent, updateEvent, deleteEvent)
  // são para funcionalidades de ADMIN, que não serão usadas pela página pública de Agenda.
  // Mantenha-os para futura expansão ou para consistência do serviço.
  getEventById(id: string): Observable<EventItem | null> {
    const event = this.mockEvents.find(e => e.id === id);
    return of(event ? { ...event } : null);
  }

  createEvent(event: Omit<EventItem, 'id'>): Observable<EventItem> {
    const newEvent: EventItem = {
      ...event,
      id: `evt${this.nextIdCounter++}`
    };
    this.mockEvents.push(newEvent);
    return of({ ...newEvent });
  }

  updateEvent(id: string, event: EventItem): Observable<boolean> {
    const index = this.mockEvents.findIndex(e => e.id === id);
    if (index > -1) {
      this.mockEvents[index] = { ...event, id: id };
      return of(true);
    }
    return of(false);
  }

  deleteEvent(id: string): Observable<boolean> {
    const initialLength = this.mockEvents.length;
    this.mockEvents = this.mockEvents.filter(e => e.id !== id);
    return of(this.mockEvents.length < initialLength);
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro do cliente: ${error.error.message}`;
    } else {
      errorMessage = `Erro do servidor: ${error.status} - ${error.message}`;
    }
    console.error('Ocorreu um erro na API (simulado/real):', errorMessage, error);
    return throwError(() => new Error('Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde.'));
  }
}
