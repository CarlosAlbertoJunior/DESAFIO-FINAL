// src/app/cn-cosplay/cn-cosplay.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

// Interface atualizada para incluir os pontos de bónus
interface RankedPlayer {
  position: number;
  name: string;
  points: number;
  photoUrl?: string;
  rankChange?: {
    direction: 'up' | 'down' | 'same';
    value: number;
  };
  bonus?: { // Propriedade para os pontos extra
    type: 'juiz';
    value: number;
  };
}

@Component({
  selector: 'app-cn-cosplay',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cncosplay.html',
  styleUrls: ['./cncosplay.css']
})
export class Cncosplay implements OnInit {

  // Sua lista de jogadores atualizada
  private allPlayers: RankedPlayer[] = [
    { position: 1, name: 'Rafael Esteves', points: 60.4, photoUrl: '/img/CN COSPLAY/rafa.jpg', rankChange: { direction: 'up', value: 4 }, bonus: { type: 'juiz', value: 15 } },
    { position: 2, name: 'Nathália Nogueira', points: 45.7, photoUrl: 'img/CN COSPLAY/nath.jpg', rankChange: { direction: 'up', value: 5 } },
    { position: 3, name: 'Camila Almeida', points: 45.5, photoUrl: 'img/CN COSPLAY/camila.jpg', rankChange: { direction: 'up', value: 1 } },
    { position: 4, name: 'Guilherme Queiroz', points: 45.3, photoUrl: 'img/CN COSPLAY/Gui.jpg', rankChange: { direction: 'up', value: 2}, },
    { position: 5, name: 'Fred Stan', points: 43.7, photoUrl: 'img/CN COSPLAY/fred.jpg', rankChange: { direction: 'up', value: 1 } },
    { position: 6, name: 'Luma Abram cecilia', points: 42.4, rankChange: { direction: 'down', value: 6 } },
    { position: 7, name: 'Ana Paula Oliveira', points: 40.3, rankChange: { direction: 'down', value: 4 } },
    { position: 8, name: 'Saimon Roniele', points: 40.3, rankChange: { direction: 'up', value: 12 }, bonus: { type: 'juiz', value: 15 } },
    { position: 9, name: 'Bianca Machado', points: 40.1, rankChange: { direction: 'up', value: 4 } },
    { position: 10, name: 'Clara Guimarães', points: 39.8, rankChange: { direction: 'up', value: 4 } },
    { position: 11, name: 'Lygia Chaves', points: 39.4, rankChange: { direction: 'same', value: 0 } },
    { position: 12, name: 'Jutair Costa', points: 38.9, rankChange: { direction: 'down', value: 4 } },
  ];

  public top5Players: RankedPlayer[] = [];
  public otherPlayers: RankedPlayer[] = [];

  constructor() { }

  ngOnInit(): void {
    this.top5Players = this.allPlayers.slice(0, 5);
    this.otherPlayers = this.allPlayers.slice(5, 12);
  }
}
