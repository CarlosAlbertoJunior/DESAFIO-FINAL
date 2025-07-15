// src/app/agenda/agenda.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventItem } from '../models/event.model'; // Importa a interface do modelo
import { EventService } from '../event.service'; // Importa o EventService

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './agenda.html',
  styleUrls: ['./agenda.css']
})
export class Agenda implements OnInit {

  upcomingEvents: EventItem[] = [];
  pastEvents: EventItem[] = [];

  constructor(private eventService: EventService) { } // Injete o EventService aqui

  ngOnInit(): void {
    this.loadEvents();
  }

  private loadEvents() {
    this.eventService.getEvents().subscribe(
      (data: EventItem[]) => {
        const currentDate = new Date();
        // Ajuste o formato da data para comparação (assumindo dd/mm/yyyy -> yyyy-mm-dd)
        this.upcomingEvents = data.filter(event => {
          const eventDateParts = event.date.split('/');
          // Date constructor month is 0-indexed (0 for January, 11 for December)
          const eventDate = new Date(+eventDateParts[2], +eventDateParts[1] - 1, +eventDateParts[0]);
          return eventDate >= currentDate && event.status === 'upcoming';
        });
        this.pastEvents = data.filter(event => {
          const eventDateParts = event.date.split('/');
          const eventDate = new Date(+eventDateParts[2], +eventDateParts[1] - 1, +eventDateParts[0]);
          return eventDate < currentDate || event.status === 'past';
        });

        // Ordenar eventos futuros por data crescente e passados por data decrescente
        this.upcomingEvents.sort((a, b) => {
          const dateA = new Date(+a.date.split('/')[2], +a.date.split('/')[1] - 1, +a.date.split('/')[0]).getTime();
          const dateB = new Date(+b.date.split('/')[2], +b.date.split('/')[1] - 1, +b.date.split('/')[0]).getTime();
          return dateA - dateB;
        });
        this.pastEvents.sort((a, b) => {
          const dateA = new Date(+a.date.split('/')[2], +a.date.split('/')[1] - 1, +a.date.split('/')[0]).getTime();
          const dateB = new Date(+b.date.split('/')[2], +b.date.split('/')[1] - 1, +b.date.split('/')[0]).getTime();
          return dateB - dateA;
        });
      },
      (error: any) => {
        console.error('Erro ao carregar eventos para a agenda:', error);
        // Implementar mensagem de erro para o usuário se desejar
      }
    );
  }
}
