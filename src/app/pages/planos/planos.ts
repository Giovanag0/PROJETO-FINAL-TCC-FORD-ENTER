import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

interface Plano {
  nome: string;
  preco: number;
  destaque?: boolean;
  badge?: string;
  descricao: string;
  beneficios: string[];
}

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planos.html',
  styleUrl: './planos.css',
})
export class Planos {
  planos: Plano[] = [
    {
      nome: 'Básico',
      preco: 90,
      descricao: 'Ideal para quem está começando.',
      beneficios: [
        'Acesso à musculação',
        'Avaliação física inicial',
        'Horário livre',
      ],
    },
    {
      nome: 'Intermediário',
      preco: 130,
      descricao: 'Musculação + uma modalidade extra.',
      beneficios: [
        'Acesso à musculação',
        '1 aula à sua escolha',
        'Avaliação física trimestral',
        
      ],
    },
    {
      nome: 'Premium',
      preco: 200,
      destaque: true,
      badge: 'Mais popular',
      descricao: 'Acesso total, sem limites.',
      beneficios: [
        'Acesso ilimitado a todas as modalidades',
        'Aulas em grupo inclusas',
        'Avaliação física trimestral',
        'Aplicativo de treino online',
      ],
    },
    {
      nome: 'Família',
      preco: 330,
      badge: 'Melhor custo-benefício',
      descricao: 'Toda a família se movimentando.',
      beneficios: [
        'Inclui até 3 pessoas',
        'Acesso ilimitado a todas as modalidades',
        'Avaliação física trimestral para cada integrante',
        'Aplicativo de treino online para cada integrante',
      ],
    },
  ];

constructor(private router: Router, private authService: AuthService) {}

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  assinar(plano: Plano) {
    // Aqui futuramente pode redirecionar para um checkout/cadastro
    this.router.navigate(['/pagamento', plano.nome]);
  }
}
