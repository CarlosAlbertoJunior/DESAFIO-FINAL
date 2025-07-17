// src/app/perfil/perfil.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getSeloIcon(selo: string): string {
    if (!selo) return 'bi-question-circle';
    const icons: { [key: string]: string } = {
      'Bronze': 'bi-shield-fill',
      'Ruby': 'bi-suit-diamond-fill',
      'Dourada': 'bi-star-fill',
      'Esmeralda': 'bi-gem'
    };
    return icons[selo] || '';
  }

  getSeloClass(selo: string): string {
    if (!selo) return '';
    return 'selo-' + selo.toLowerCase();
  }

  logout(): void {
    this.authService.logout();
  }
}
