// src/app/models/event.model.ts
export interface EventItem {
  id: string | null; // ID único, pode ser nulo para novos eventos (não usados aqui na exibição)
  title: string;
  date: string; // Formato: "dd/mm/aaaa"
  time: string; // Formato: "HH:MM - HH:MM" ou "HH:MM"
  location: string; // Ex: "Parque Shopping Bahia - Salvador"
  description: string;
  image?: string; // URL opcional da imagem do evento
  status: 'upcoming' | 'past' | 'cancelled'; // Para filtrar eventos
  link?: string; // Link para inscrição, mais informações, etc.
}
