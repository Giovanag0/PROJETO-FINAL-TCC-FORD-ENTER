import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TreinosService, Treino, Exercicio } from '../../services/treinos.services';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-treino-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './treino-detalhe.html',
  styleUrl: './treino-detalhe.css'
})
export class TreinoDetalhe {
  treino: Treino | undefined;
  nivelAtivo: 'Iniciante' | 'Intermediário' | 'Avançado' = 'Iniciante';
  niveis: ('Iniciante' | 'Intermediário' | 'Avançado')[] = ['Iniciante', 'Intermediário', 'Avançado'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private treinosService: TreinosService,
    private authService: AuthService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.treino = this.treinosService.getTreinoPorId(id);
    }
  }

  selecionarNivel(nivel: 'Iniciante' | 'Intermediário' | 'Avançado') {
    this.nivelAtivo = nivel;
  }

  exerciciosDoNivel() {
    if (!this.treino) return [];
    return this.treino.exercicios[this.nivelAtivo];
  }

  exerciciosAgrupados(): { grupo: string; exercicios: Exercicio[] }[] {
    const lista = this.exerciciosDoNivel();
    const grupos: { grupo: string; exercicios: Exercicio[] }[] = [];
    for (const ex of lista) {
      const nomeGrupo = ex.grupo || '';
      let grupoAtual = grupos.find(g => g.grupo === nomeGrupo);
      if (!grupoAtual) {
        grupoAtual = { grupo: nomeGrupo, exercicios: [] };
        grupos.push(grupoAtual);
      }
      grupoAtual.exercicios.push(ex);
    }
    return grupos;
  }

  voltar() {
    this.router.navigate(['/treinos']);
  }

  abrirVideo(video?: string) {
    if (video) window.open(video, '_blank');
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }
   sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}