import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from "../components/menu/menu";

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class Sobre {

}
