import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  isCadastro = false;
  nome = '';
  email = '';
  senha = '';
  erro = '';

  aceitouTermos = false;
  modalAberto: 'termos' | 'privacidade' | null = null;

  // Pop-up de aviso quando o usuário não tem cadastro
  avisoLoginAberto = false;

  constructor(private router: Router, private authService: AuthService) {}
  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

  alternarModo() {
    this.isCadastro = !this.isCadastro;
    this.erro = '';
  }

  abrirModal(tipo: 'termos' | 'privacidade', event: Event) {
    event.preventDefault();
    this.modalAberto = tipo;
  }

  fecharModal() {
    this.modalAberto = null;
  }

  fecharAvisoLogin() {
    this.avisoLoginAberto = false;
  }

  irParaCadastroPeloAviso() {
    this.avisoLoginAberto = false;
    this.isCadastro = true;
    this.erro = '';
  }

  emailValido(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }

  mostrarSenha = false;
alternarMostrarSenha() {
  this.mostrarSenha = !this.mostrarSenha;
}

  entrar() {
    if (!this.email || !this.senha) {
      this.erro = 'Preencha todos os campos!';
      return;
    }
    if (!this.emailValido(this.email)) {
      this.erro = 'Digite um email válido com @';
      return;
    }

    const resultado = this.authService.validarLogin(this.email, this.senha);

    if (resultado === 'nao-cadastrado') {
      this.avisoLoginAberto = true;
      return;
    }

    if (resultado === 'senha-invalida') {
      this.erro = 'Senha incorreta. Tente novamente.';
      return;
    }

    this.erro = '';
    this.authService.login(this.email);
    this.router.navigate(['/home']);
  }

  cadastrar() {
    if (!this.nome || !this.email || !this.senha) {
      this.erro = 'Preencha todos os campos!';
      return;
    }
    if (!this.emailValido(this.email)) {
      this.erro = 'Digite um email válido com @';
      return;
    }
    if (!this.aceitouTermos) {
      this.erro = 'Você precisa aceitar os Termos de Uso e a Política de Privacidade.';
      return;
    }
    if (this.authService.emailJaCadastrado(this.email)) {
      this.erro = 'Este email já está cadastrado. Faça login.';
      return;
    }

    this.authService.cadastrarUsuario({
      nome: this.nome,
      email: this.email,
      senha: this.senha
    });

    alert('Cadastro realizado com sucesso!');
    this.isCadastro = false;
    this.aceitouTermos = false;
    this.erro = '';
    this.nome = '';
    this.senha = '';
  }
}