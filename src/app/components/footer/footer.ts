// src/app/footer/footer.component.ts
import { Component, OnInit } from '@angular/core'; // Adicione OnInit
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit { // Implemente OnInit
  currentYear: number = 0; // Variável para armazenar o ano atual

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear(); // Obtém o ano atual
  }
}
