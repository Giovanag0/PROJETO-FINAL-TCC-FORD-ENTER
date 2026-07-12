import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AcessibilidadeService } from '../../services/acessibilidade.service';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  slideAtual = 0;

  slides = [
    {
      imagem: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200',
      titulo: 'Bem-vindo a academia Gusmão Fitness',
      subtitulo: 'Sua jornada começa aqui'
    },

    {
      imagem: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200',
      titulo: 'Supere seus limites',
      subtitulo: 'Treine com os melhores instrutores'
    },
    {
      imagem: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200',
      titulo: 'Força e Disciplina',
      subtitulo: 'Alcance o corpo que você sempre quis'
    },
    
  ];

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private a11y: AcessibilidadeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    setInterval(() => {
      if (!this.a11y.animacoesPausadas) {
        this.proximoSlide();
        this.cdr.detectChanges();
      }
    }, 5000);
  }

  irParaSlide(index: number) {
    this.slideAtual = index;
  }

  proximoSlide() {
    this.slideAtual = (this.slideAtual + 1) % this.slides.length;
  }

  slideAnterior() {
    this.slideAtual = (this.slideAtual - 1 + this.slides.length) % this.slides.length;
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}