import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface CanalContato {
  icone: string;
  nome: string;
  informacao: string;
  link: string;
}

@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  canais: CanalContato[] = [
    {
      icone: '📱',
      nome: 'WhatsApp/Telefone',
      informacao: '(71) 98820-4439',
      link: 'https://wa.me/5571988204439'
    },
    {
      icone: '📸',
      nome: 'Instagram',
      informacao: '@academiagusmaofitness',
      link: 'https://instagram.com/academiagusmaofitness'
    },
    {
      icone: '📧',
      nome: 'Email',
      informacao: 'academiagusmaofitness@gmail.com',
      link: 'mailto:academiagusmaofitness@gmail.com'
    },
  ];

  endereco = 'Av. Oceânica, 1234 - Barra, Salvador - BA';
  mapaUrl: SafeResourceUrl;

  // Formulário
  nome = '';
  email = '';
  mensagem = '';
  erro = '';
  enviado = false;

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps?q=' + encodeURIComponent(this.endereco) + '&output=embed'
    );
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

  emailValido(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }

  enviarMensagem() {
    this.enviado = false;

    if (!this.nome || !this.email || !this.mensagem) {
      this.erro = 'Preencha todos os campos!';
      return;
    }
    if (!this.emailValido(this.email)) {
      this.erro = 'Digite um email válido com @';
      return;
    }

    // Aqui futuramente pode-se integrar com uma API real de envio de mensagens
    this.erro = '';
    this.enviado = true;
    this.nome = '';
    this.email = '';
    this.mensagem = '';
  }
}
