import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Carocel } from "../components/carocel/carocel";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Carocel],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
