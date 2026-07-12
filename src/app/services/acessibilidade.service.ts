import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcessibilidadeService {
  fontScale = 100;
  altoContraste = false;
  animacoesPausadas = false;
  modoClaro = false;

  aumentarFonte() {
    if (this.fontScale < 150) {
      this.fontScale += 10;
      this.aplicarFonte();
    }
  }

  diminuirFonte() {
    if (this.fontScale > 80) {
      this.fontScale -= 10;
      this.aplicarFonte();
    }
  }

  resetarFonte() {
    this.fontScale = 100;
    this.aplicarFonte();
  }

  private aplicarFonte() {
    document.documentElement.style.fontSize = (this.fontScale / 100 * 16) + 'px';
  }

  toggleContraste() {
    this.altoContraste = !this.altoContraste;
    document.body.classList.toggle('alto-contraste', this.altoContraste);
  }

  toggleModoClaro() {
    this.modoClaro = !this.modoClaro;
    document.body.classList.toggle('modo-claro', this.modoClaro);
  }
}