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
      photoUrl: '/img/COORDENAÇÃO/cloud.jpg',
      bio: 'Fundador da Cosnection, Cloud é apaixonado por criar eventos que unem a comunidade. Com vasta experiência em produção, ele lidera a equipa com a visão de transformar Salvador num polo da cultura geek.',
      socials: { instagram: 'https://instagram.com/cloud' }
    },
    {
      name: 'Elisa Cruz',
      role: 'Diretora de Comunicação e Talentos',
      photoUrl: '/img/COORDENAÇÃO/Elisa.jpg',
      bio: 'Responsável pela mídia, publicidade e pelo contacto com artistas, Elisa é a apresentadora e a força criativa que impulsiona a imagem da Cosnection, unindo a sua paixão por administração e cultura pop.',
      socials: { instagram: 'https://instagram.com/elisa' }
    },
    {
      name: 'Danilo Zuza',
      role: 'Coordenador de Palco e Apresentador',
      photoUrl: '/img/COORDENAÇÃO/zuza.JPG',
      bio: 'Mais conhecido como Zuza, é o apresentador dos desfiles e do Kahoot Geek, além de ajudar na produção das apresentações. Como administrador de um dos maiores grupos geek de Salvador, sente-se realizado ao trabalhar nos bastidores.',
      socials: { instagram: 'https://instagram.com/membro3' }
    },
    {
      name: 'Mireli Cachoeira',
      role: 'Coordenadora Administrativa e de Cosplayers',
      photoUrl: '/img/COORDENAÇÃO/mireli.JPG',
      bio: 'Com uma paixão recente e avassaladora por cosplay, Mireli é a responsável pelos contratos e pela coordenação do check-in dos cosplayers nos eventos, garantindo uma experiência única e organizada para todos os participantes.',
      socials: { instagram: 'https://instagram.com/membro3' }
    },
    {
      name: 'Morgana Falcão',
      role: 'Produtora Executiva e Coordenadora de palco',
      photoUrl: '/img/COORDENAÇÃO/morgs.png',
      bio: 'Responsável por toda a curadoria e contacto com os artistas convidados, desde cosplayers a ilustradores, garantindo um line-up diversificado e talentoso em cada evento.',
      socials: { instagram: 'https://instagram.com/membro3' }
    },
    {
      name: 'Paulo Coelho',
      role: 'Audio Visual e Fotografia',
      photoUrl: '/img/COORDENAÇÃO/paulo.jpg',
      bio: 'O olhar por trás das lentes, Paulo é responsável por capturar a energia e os momentos inesquecíveis dos nossos eventos. A sua paixão pela fotografia e pelo vídeo transforma cada concurso e desfile numa memória visual espetacular.',
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
