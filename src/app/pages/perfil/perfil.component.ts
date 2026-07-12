import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../services/auth.services';
import { TreinoDiarioService, RegistroExercicio } from '../../services/treino-diario.services';
import { Treino, Exercicio } from '../../services/treinos.services';

interface Conquista {
  icone: string;
  titulo: string;
  descricao: string;
  desbloqueada: boolean;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuarioLogado: Usuario | null = null;
  perfilForm!: FormGroup;
  senhaForm!: FormGroup;

  mensagemSucesso: string = '';
  mensagemErro: string = '';
  mensagemSenhaSucesso: string = '';
  mensagemSenhaErro: string = '';

  // ===== MODAL DE CONFIGURAÇÕES =====
  modalAberto = false;
  abaModalAtiva: 'dados' | 'senha' = 'dados';

mostrarSenhaAtual = false;
mostrarNovaSenha = false;
mostrarConfirmarSenha = false;

alternarSenhaAtual(): void {
  this.mostrarSenhaAtual = !this.mostrarSenhaAtual;
}

alternarNovaSenha(): void {
  this.mostrarNovaSenha = !this.mostrarNovaSenha;
}

alternarConfirmarSenha(): void {
  this.mostrarConfirmarSenha = !this.mostrarConfirmarSenha;
}

  // ===== ÁREA DO ALUNO =====
  treinosDisponiveis: Treino[] = [];
  treinoSugerido: Treino | null = null;
  treinoSelecionadoId: string = '';

  treinoHoje: Treino | null = null;
  exerciciosHoje: Exercicio[] = [];
  registros: { [nomeExercicio: string]: RegistroExercicio } = {};

  diasPresentes: number[] = [];
  diasNoMes: number[] = [];
  nomeMesAtual = '';
  diaHoje = new Date().getDate();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private treinoDiarioService: TreinoDiarioService
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.authService.usuarioAtual();

    this.perfilForm = this.fb.group({
  nome: [this.usuarioLogado?.nome || '', [Validators.required]],
  email: [this.usuarioLogado?.email || '', [Validators.required, Validators.email]]
});

    this.senhaForm = this.fb.group({
      senhaAtual: ['', [Validators.required]],
     novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarNovaSenha: ['', [Validators.required]]
    }, {
      validators: this.checarSenhas
    });

    if (this.usuarioLogado) {
      this.carregarTreinoDoDia();
      this.carregarFrequencia();
    }
  }

  checarSenhas(group: FormGroup) {
    const nova = group.get('novaSenha')?.value;
    const confirma = group.get('confirmarNovaSenha')?.value;
    return nova === confirma ? null : { naoCoincide: true };
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }

  sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // ===== MODAL DE CONFIGURAÇÕES =====

  abrirModal(aba: 'dados' | 'senha' = 'dados'): void {
    this.abaModalAtiva = aba;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.mensagemSucesso = '';
    this.mensagemErro = '';
    this.mensagemSenhaSucesso = '';
    this.mensagemSenhaErro = '';
  }

  trocarAbaModal(aba: 'dados' | 'senha'): void {
    this.abaModalAtiva = aba;
  }

  salvarDados(): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (this.perfilForm.invalid) {
      this.mensagemErro = 'Preencha o nome corretamente.';
      return;
    }

    const novoNome = this.perfilForm.get('nome')?.value;
    this.authService.atualizarNome(novoNome);

    if (this.usuarioLogado) {
      this.usuarioLogado.nome = novoNome;
    }

    this.mensagemSucesso = 'Dados atualizados com sucesso!';
  }

  alterarSenha(): void {
    this.mensagemSenhaSucesso = '';
    this.mensagemSenhaErro = '';

    if (this.senhaForm.invalid) {
      if (this.senhaForm.errors?.['naoCoincide']) {
        this.mensagemSenhaErro = this.mensagemSenhaErro = 'A nova senha precisa ter pelo menos 6 caracteres.';
      } else {
        this.mensagemSenhaErro = this.mensagemSenhaErro = 'A nova senha precisa ter pelo menos 6 caracteres, com letras e números.';
      }
      return;
    }

    const { senhaAtual, novaSenha } = this.senhaForm.value;
    const resultado = this.authService.trocarSenha(senhaAtual, novaSenha);

    if (resultado === 'senha-atual-invalida') {
      this.mensagemSenhaErro = 'Senha atual incorreta.';
      return;
    }

    this.mensagemSenhaSucesso = 'Senha alterada com sucesso!';
    this.senhaForm.reset();
  }

  // ===== ÁREA DO ALUNO =====

  carregarTreinoDoDia(): void {
    this.treinosDisponiveis = this.treinoDiarioService.getTodosTreinos();
    this.treinoSugerido = this.treinoDiarioService.sugestaoDoDia();

    const escolhaSalva = this.usuarioLogado
      ? this.treinoDiarioService.getTreinoEscolhidoHoje(this.usuarioLogado.email)
      : null;

    this.treinoSelecionadoId = escolhaSalva || this.treinoSugerido?.id || '';

    this.aplicarTreinoSelecionado();

    if (this.usuarioLogado) {
      this.registros = this.treinoDiarioService.getRegistrosDoDia(this.usuarioLogado.email);
    }
  }

  selecionarTreino(treinoId: string): void {
    this.treinoSelecionadoId = treinoId;

    if (this.usuarioLogado) {
      this.treinoDiarioService.salvarTreinoEscolhido(this.usuarioLogado.email, treinoId);
    }

    this.aplicarTreinoSelecionado();
  }

  private aplicarTreinoSelecionado(): void {
    this.treinoHoje = this.treinosDisponiveis.find(t => t.id === this.treinoSelecionadoId) || null;
    this.exerciciosHoje = this.treinoSelecionadoId
      ? this.treinoDiarioService.exerciciosDoTreino(this.treinoSelecionadoId)
      : [];
  }

  toggleExercicio(nome: string): void {
    if (!this.usuarioLogado) return;

    const atual = this.registros[nome] || { feito: false, carga: '' };
    const novoFeito = !atual.feito;
    this.registros[nome] = { feito: novoFeito, carga: atual.carga };

    this.treinoDiarioService.marcarExercicio(this.usuarioLogado.email, nome, novoFeito, atual.carga);
    this.carregarFrequencia();
  }

  atualizarCarga(nome: string, carga: string): void {
    if (!this.usuarioLogado) return;

    const atual = this.registros[nome] || { feito: false, carga: '' };
    this.registros[nome] = { feito: atual.feito, carga };

    this.treinoDiarioService.marcarExercicio(this.usuarioLogado.email, nome, atual.feito, carga);
  }

  isFeito(nome: string): boolean {
    return this.registros[nome]?.feito || false;
  }

  cargaDe(nome: string): string {
    return this.registros[nome]?.carga || '';
  }

  totalFeitos(): number {
    return this.exerciciosHoje.filter(ex => this.registros[ex.nome]?.feito).length;
  }

  progressoPercentual(): number {
    if (!this.exerciciosHoje.length) return 0;
    return (this.totalFeitos() / this.exerciciosHoje.length) * 100;
  }

  treinoCompleto(): boolean {
    return this.exerciciosHoje.length > 0 && this.totalFeitos() === this.exerciciosHoje.length;
  }

  carregarFrequencia(): void {
    if (!this.usuarioLogado) return;

    this.diasPresentes = this.treinoDiarioService.diasPresentesNoMesAtual(this.usuarioLogado.email);

    const hoje = new Date();
    const totalDiasNoMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
    this.diasNoMes = Array.from({ length: totalDiasNoMes }, (_, i) => i + 1);

    const nomesMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    this.nomeMesAtual = nomesMeses[hoje.getMonth()];
  }

  // ===== CONQUISTAS =====

  conquistas(): Conquista[] {
    const dias = this.diasPresentes.length;

    return [
      {
        icone: '🥇',
        titulo: 'Primeiro Treino',
        descricao: 'Compareça pelo menos 1 dia no mês',
        desbloqueada: dias >= 1
      },
      {
        icone: '🔥',
        titulo: 'Semana Completa',
        descricao: 'Compareça 7 dias no mês',
        desbloqueada: dias >= 7
      },
      {
        icone: '⚡',
        titulo: 'Quinzena de Fogo',
        descricao: 'Compareça 15 dias no mês',
        desbloqueada: dias >= 15
      },
      {
        icone: '🏆',
        titulo: 'Mês Dedicado',
        descricao: 'Compareça 20 dias no mês',
        desbloqueada: dias >= 20
      },
      {
        icone: '✅',
        titulo: 'Treino Zerado',
        descricao: 'Complete todos os exercícios do dia',
        desbloqueada: this.treinoCompleto()
      }
    ];
  }

  totalConquistasDesbloqueadas(): number {
    return this.conquistas().filter(c => c.desbloqueada).length;
  }
  irParaConquistas(): void {
    document.querySelector('.secao-conquistas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}