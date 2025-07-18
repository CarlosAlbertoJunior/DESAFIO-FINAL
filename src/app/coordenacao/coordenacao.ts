// src/app/coordenacao/coordenacao.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Interface para estruturar os dados de cada membro
interface TeamMember {
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
  socials: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

@Component({
  selector: 'app-coordenacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coordenacao.html',
  styleUrls: ['./coordenacao.css']
})
export class Coordenacao implements OnInit {

  // Lista com os membros da equipa. Preencha com os dados reais.
  public teamMembers: TeamMember[] = [
    {
      name: 'Cloud',
      role: 'Diretor Geral e Fundador',
      photoUrl: 'assets/img/team/cloud.jpg',
      bio: 'Fundador da Cosnection, Cloud é apaixonado por criar eventos que unem a comunidade. Com vasta experiência em produção, ele lidera a equipa com a visão de transformar Salvador num polo da cultura geek.',
      socials: { instagram: 'https://instagram.com/cloud' }
    },
    {
      name: 'Elisa Cruz',
      role: 'Diretora de Markenting e Apresentadora',
      photoUrl: 'assets/img/team/elisa.jpg',
      bio: 'Elisa é a energia contagiante dos nossos palcos. Responsável por toda a programação e apresentação, ela garante que cada momento do evento seja dinâmico e inesquecível para o público.',
      socials: { instagram: 'https://instagram.com/elisa' }
    },
    {
      name: 'Danilo Zuza',
      role: 'Coordenador de Palco e Apresentador',
      photoUrl: 'assets/img/team/membro3.jpg',
      bio: 'Responsável por toda a curadoria e contacto com os artistas convidados, desde cosplayers a ilustradores, garantindo um line-up diversificado e talentoso em cada evento.',
      socials: { instagram: 'https://instagram.com/membro3' }
    },
    {
      name: 'Mireli Cachoeira',
      role: 'Coordenadora Cosplay e Produção Tecnica',
      photoUrl: 'assets/img/team/membro3.jpg',
      bio: 'Responsável por toda a curadoria e contacto com os artistas convidados, desde cosplayers a ilustradores, garantindo um line-up diversificado e talentoso em cada evento.',
      socials: { instagram: 'https://instagram.com/membro3' }
    },
    {
      name: 'Morgana Falcão',
      role: 'Produtora Executiva e Coordenadora de palco',
      photoUrl: 'assets/img/team/membro3.jpg',
      bio: 'Responsável por toda a curadoria e contacto com os artistas convidados, desde cosplayers a ilustradores, garantindo um line-up diversificado e talentoso em cada evento.',
      socials: { instagram: 'https://instagram.com/membro3' }
    },

  ];

  // Variáveis para controlar o modal
  public selectedMember: TeamMember | null = null;
  public isModalVisible = false;

  constructor() { }

  ngOnInit(): void { }

  // Abre o modal com os detalhes do membro selecionado
  openMemberModal(member: TeamMember): void {
    this.selectedMember = member;
    this.isModalVisible = true;
  }

  // Fecha o modal
  closeMemberModal(): void {
    this.isModalVisible = false;
    // Pequeno delay para a animação de fade-out acontecer
    setTimeout(() => {
      this.selectedMember = null;
    }, 300);
  }
}
