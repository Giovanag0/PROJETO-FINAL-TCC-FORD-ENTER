import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css'
})
export class Pagamento {
  plano = '';
  nome = '';
  numero = '';
  validade = '';
  cvv = '';
  pago = false;
  erro = '';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.plano = this.route.snapshot.paramMap.get('plano') || '';
  }

  pagar() {
    if (!this.nome || !this.numero || !this.validade || !this.cvv) {
      this.erro = 'Preencha todos os campos!';
      return;
    }
    if (this.numero.length < 16) {
      this.erro = 'Número do cartão inválido!';
      return;
    }
    this.erro = '';
    this.pago = true;
  }

  voltar() {
    this.router.navigate(['/planos']);
  }
}