// home.component.ts
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'; // Adicione ElementRef e ViewChild
import { Carocel } from "../components/carocel/carocel";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Carocel],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {
onCoordenacao() {
this.router.navigate(['/coordenacao']);
}

  // Adicione ViewChild para acessar os elementos do DOM
  @ViewChild('image1') image1Ref!: ElementRef<HTMLImageElement>;
  @ViewChild('container1') container1Ref!: ElementRef<HTMLElement>;

  @ViewChild('image2') image2Ref!: ElementRef<HTMLImageElement>;
  @ViewChild('container2') container2Ref!: ElementRef<HTMLElement>;

  @ViewChild('image3') image3Ref!: ElementRef<HTMLImageElement>;
  @ViewChild('container3') container3Ref!: ElementRef<HTMLElement>;

  // Variáveis para controlar a posição 'top' de cada imagem
  image1Top: string = '0px';
  image2Top: string = '0px';
  image3Top: string = '0px';


  constructor(private router: Router) { }

  ngAfterViewInit(): void {

    setTimeout(() => {
      if (this.image1Ref && this.container1Ref) {
        this.calculateAndSetImagePosition(this.image1Ref.nativeElement, this.container1Ref.nativeElement);
      }
      if (this.image2Ref && this.container2Ref) {
        this.calculateAndSetImagePosition(this.image2Ref.nativeElement, this.container2Ref.nativeElement);
      }
      if (this.image3Ref && this.container3Ref) {
        this.calculateAndSetImagePosition(this.image3Ref.nativeElement, this.container3Ref.nativeElement);
      }
    }, 50); // Um pequeno atraso de 50ms
  }

  // Função chamada quando o mouse entra no contêiner da imagem
  onMouseEnter(imageElement: HTMLImageElement, containerElement: HTMLElement) {
    // Garante que a imagem esteja totalmente carregada para obter as dimensões corretas
    if (imageElement.complete) {
      this.calculateAndSetImagePosition(imageElement, containerElement);
    } else {
      // Se a imagem ainda não carregou, espera o evento 'load'
      imageElement.onload = () => {
        this.calculateAndSetImagePosition(imageElement, containerElement);
      };
    }
  }

  // Função auxiliar para calcular e definir a posição da imagem
  private calculateAndSetImagePosition(imageElement: HTMLImageElement, containerElement: HTMLElement) {
    const imageHeight = imageElement.offsetHeight; // Altura real da imagem
    const containerHeight = containerElement.offsetHeight; // Altura visível do contêiner

    // --- ADICIONE ESTES CONSOLE.LOGS PARA DEPURAR ---
    console.log(`--- Depuração para ${imageElement.id} ---`);
    console.log(`Altura da Imagem (imageHeight): ${imageHeight}px`);
    console.log(`Altura do Contêiner (containerHeight): ${containerHeight}px`);
    // -------------------------------------------------

    if (imageHeight > containerHeight) {
      const scrollAmount = imageHeight - containerHeight;
      const targetTop = `-${scrollAmount}px`;

      // --- ADICIONE ESTE CONSOLE.LOG PARA DEPURAR ---
      console.log(`Valor de Rolagem Calculado (targetTop): ${targetTop}`);
      // -------------------------------------------------

      if (imageElement.id === 'image1') {
        this.image1Top = targetTop;
      } else if (imageElement.id === 'image2') {
        this.image2Top = targetTop;
      } else if (imageElement.id === 'image3') {
        this.image3Top = targetTop;
      }
      // Adicione mais 'else if' para outras imagens
    } else {
      // Se a imagem for menor ou igual ao contêiner, ela volta ao topo
      if (imageElement.id === 'image1') {
        this.image1Top = '0px';
      } else if (imageElement.id === 'image2') {
        this.image2Top = '0px';
      } else if (imageElement.id === 'image3') {
        this.image3Top = '0px';
      }
    }
  }

  onMouseLeave(imageElement: HTMLImageElement) {
    // --- ADICIONE ESTE CONSOLE.LOG PARA DEPURAR ---
    console.log(`Mouse saiu de ${imageElement.id}. Retornando ao topo.`);
    // -------------------------------------------------

    if (imageElement.id === 'image1') {
      this.image1Top = '0px';
    } else if (imageElement.id === 'image2') {
      this.image2Top = '0px';
    } else if (imageElement.id === 'image3') {
      this.image3Top = '0px';
    }
    // ... continue para outras imagens
  }
}
