import { Injectable } from '@angular/core';

export interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private chaveStorage = 'usuariosCadastrados';
  private chaveSessao = 'usuarioLogado';
  // Retorna: 'ok' se trocou com sucesso, 'email-em-uso' se outro usuário já usa esse e-mail
  atualizarEmail(novoEmail: string): 'ok' | 'email-em-uso' {
    const emailLogado = localStorage.getItem(this.chaveSessao);
    if (!emailLogado) return 'email-em-uso';

    const emailMudou = novoEmail.toLowerCase() !== emailLogado.toLowerCase();

    if (emailMudou && this.emailJaCadastrado(novoEmail)) {
      return 'email-em-uso';
    }

    const usuarios = this.getUsuarios();
    const usuario = usuarios.find(u => u.email.toLowerCase() === emailLogado.toLowerCase());

    if (usuario) {
      usuario.email = novoEmail;
      this.salvarUsuarios(usuarios);
      localStorage.setItem(this.chaveSessao, novoEmail);
    }

    return 'ok';
  }

  private getUsuarios(): Usuario[] {
    const dados = localStorage.getItem(this.chaveStorage);
    return dados ? JSON.parse(dados) : [];
  }

  private salvarUsuarios(usuarios: Usuario[]) {
    localStorage.setItem(this.chaveStorage, JSON.stringify(usuarios));
  }

  emailJaCadastrado(email: string): boolean {
    return this.getUsuarios().some(
      u => u.email.toLowerCase() === email.toLowerCase()
    );
  }

  cadastrarUsuario(usuario: Usuario): void {
    const usuarios = this.getUsuarios();
    usuarios.push(usuario);
    this.salvarUsuarios(usuarios);
  }

  // Retorna: 'ok' se login válido, 'nao-cadastrado' se o email não existe,
  // 'senha-invalida' se o email existe mas a senha está errada.
  validarLogin(email: string, senha: string): 'ok' | 'nao-cadastrado' | 'senha-invalida' {
    const usuario = this.getUsuarios().find(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!usuario) return 'nao-cadastrado';
    if (usuario.senha !== senha) return 'senha-invalida';
    return 'ok';
  }

  // ===== CONTROLE DE SESSÃO =====

  login(email: string): void {
    localStorage.setItem(this.chaveSessao, email);
  }

  logout(): void {
    localStorage.removeItem(this.chaveSessao);
  }

  isLogado(): boolean {
    return !!localStorage.getItem(this.chaveSessao);
  }

  usuarioAtual(): Usuario | null {
  // 1. Pega o email que está salvo na sessão
  const emailLogado = localStorage.getItem(this.chaveSessao);
  
  if (!emailLogado) return null;

  // 2. Procura o usuário completo na lista de cadastrados usando o email
  const usuarioCompleto = this.getUsuarios().find(
    u => u.email.toLowerCase() === emailLogado.toLowerCase()
  );

  return usuarioCompleto || null;
}

  // ===== PERFIL =====

  atualizarNome(novoNome: string): void {
    const emailLogado = localStorage.getItem(this.chaveSessao);
    if (!emailLogado) return;

    const usuarios = this.getUsuarios();
    const usuario = usuarios.find(u => u.email.toLowerCase() === emailLogado.toLowerCase());
    if (usuario) {
      usuario.nome = novoNome;
      this.salvarUsuarios(usuarios);
    }
  }

  // Retorna: 'ok' se trocou com sucesso, 'senha-atual-invalida' se a senha atual não confere
  trocarSenha(senhaAtual: string, novaSenha: string): 'ok' | 'senha-atual-invalida' {
    const emailLogado = localStorage.getItem(this.chaveSessao);
    if (!emailLogado) return 'senha-atual-invalida';

    const usuarios = this.getUsuarios();
    const usuario = usuarios.find(u => u.email.toLowerCase() === emailLogado.toLowerCase());

    if (!usuario || usuario.senha !== senhaAtual) {
      return 'senha-atual-invalida';
    }

    usuario.senha = novaSenha;
    this.salvarUsuarios(usuarios);
    return 'ok';
  }
}