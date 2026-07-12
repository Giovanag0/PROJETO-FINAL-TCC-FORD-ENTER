import { Injectable } from '@angular/core';
import { TreinosService, Treino, Exercicio } from './treinos.services';

export interface RegistroExercicio {
  feito: boolean;
  carga: string;
}

@Injectable({ providedIn: 'root' })
export class TreinoDiarioService {
  constructor(private treinosService: TreinosService) {}

  private chaveRegistro(email: string, data: string): string {
    return `treinoDiario:${email}:${data}`;
  }

  private chavePresenca(email: string): string {
    return `presencas:${email}`;
  }

  private chaveEscolha(email: string, data: string): string {
    return `treinoEscolhido:${email}:${data}`;
  }

  dataDeHoje(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  // Lista todos os treinos disponíveis, pro aluno escolher
  getTodosTreinos(): Treino[] {
    return this.treinosService.getTreinos();
  }

  // Sugestão automática, baseada no dia da semana (só uma dica, não obrigatória)
  sugestaoDoDia(): Treino | null {
    const treinos = this.treinosService.getTreinos();
    if (treinos.length === 0) return null;

    const diaSemana = new Date().getDay();
    return treinos[diaSemana % treinos.length];
  }

  exerciciosDoTreino(treinoId: string): Exercicio[] {
    const treino = this.treinosService.getTreinoPorId(treinoId);
    return treino ? treino.exercicios['Iniciante'] : [];
  }

  getTreinoEscolhidoHoje(email: string): string | null {
    const data = this.dataDeHoje();
    return localStorage.getItem(this.chaveEscolha(email, data));
  }

  salvarTreinoEscolhido(email: string, treinoId: string): void {
    const data = this.dataDeHoje();
    localStorage.setItem(this.chaveEscolha(email, data), treinoId);
  }

  getRegistrosDoDia(email: string): { [nomeExercicio: string]: RegistroExercicio } {
    const data = this.dataDeHoje();
    const bruto = localStorage.getItem(this.chaveRegistro(email, data));
    return bruto ? JSON.parse(bruto) : {};
  }

  marcarExercicio(email: string, nomeExercicio: string, feito: boolean, carga: string): void {
    const data = this.dataDeHoje();
    const registros = this.getRegistrosDoDia(email);
    registros[nomeExercicio] = { feito, carga };
    localStorage.setItem(this.chaveRegistro(email, data), JSON.stringify(registros));

    this.atualizarPresenca(email, data, registros);
  }

  private atualizarPresenca(email: string, data: string, registros: { [nome: string]: RegistroExercicio }): void {
    const algumFeito = Object.values(registros).some(r => r.feito);
    const presencas = this.getPresencas(email);
    const jaTem = presencas.includes(data);

    if (algumFeito && !jaTem) {
      presencas.push(data);
      this.salvarPresencas(email, presencas);
    } else if (!algumFeito && jaTem) {
      const filtradas = presencas.filter(d => d !== data);
      this.salvarPresencas(email, filtradas);
    }
  }

  private getPresencas(email: string): string[] {
    const bruto = localStorage.getItem(this.chavePresenca(email));
    return bruto ? JSON.parse(bruto) : [];
  }

  private salvarPresencas(email: string, presencas: string[]): void {
    localStorage.setItem(this.chavePresenca(email), JSON.stringify(presencas));
  }

  diasPresentesNoMesAtual(email: string): number[] {
    const presencas = this.getPresencas(email);
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();

    return presencas
      .filter(d => {
        const [ano, mes] = d.split('-').map(Number);
        return ano === anoAtual && (mes - 1) === mesAtual;
      })
      .map(d => Number(d.split('-')[2]))
      .sort((a, b) => a - b);
  }
}