import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carocel',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule,RouterModule],
  templateUrl: './carocel.html',
  styleUrl: './carocel.css'
})
export class Carocel {

}
