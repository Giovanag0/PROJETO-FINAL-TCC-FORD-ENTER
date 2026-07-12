import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcessibilidadeService } from '../../services/acessibilidade.service';

@Component({
  selector: 'app-acessibilidade',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acessibilidade.html',
  styleUrl: './acessibilidade.css',
})
export class Acessibilidade {
  painelAberto = false;

  constructor(public a11y: AcessibilidadeService) {}

  togglePainel() {
    this.painelAberto = !this.painelAberto;
  }
}