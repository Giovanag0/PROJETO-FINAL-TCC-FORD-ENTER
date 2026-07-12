import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TreinosService, Treino } from '../../services/treinos.services';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-treinos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './treinos.html',
  styleUrl: './treinos.css'
})
export class Treinos {
  @ViewChild('trilho') trilho!: ElementRef<HTMLDivElement>;

  filtroAtivo = 'Todos';

  categorias = ['Todos', 'Musculação', 'Artes Marciais', 'Dança', 'Natação'];

  iconesPorCategoria: { [key: string]: string } = {
    'Todos': '🔥',
    'Musculação': '💪',
    'Artes Marciais': '🥊',
    'Dança': '💃',
    'Natação': '🏊'
  };

  treinos: Treino[] = [];

 constructor(
  private router: Router,
  private treinosService: TreinosService,
  private authService: AuthService
) {
  this.treinos = this.treinosService.getTreinos();
}

  filtrar(categoria: string) {
    this.filtroAtivo = categoria;
    setTimeout(() => {
      if (this.trilho) this.trilho.nativeElement.scrollTo({ left: 0, behavior: 'smooth' });
    });
  }

  treinosFiltrados() {
    if (this.filtroAtivo === 'Todos') return this.treinos;
    return this.treinos.filter(t => t.categoria === this.filtroAtivo);
  }

  iconeCategoria(categoria: string) {
    return this.iconesPorCategoria[categoria] || '⭐';
  }

  rolar(direcao: 'esquerda' | 'direita') {
    const el = this.trilho.nativeElement;
    const distancia = 280;
    el.scrollBy({ left: direcao === 'direita' ? distancia : -distancia, behavior: 'smooth' });
  }

  abrirTreino(treino: Treino) {
    this.router.navigate(['/treino-detalhe', treino.id]);
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }
   sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}