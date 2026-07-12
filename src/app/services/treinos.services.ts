import { Injectable } from '@angular/core';

export interface Exercicio {
  nome: string;
  imagem: string;
  video?: string;
  descricao: string;
  grupo?: string;
}

export interface Treino {
  id: string;
  nome: string;
  categoria: string;
  horario: string;
  emoji: string;
  exercicios: {
    Iniciante: Exercicio[];
    Intermediário: Exercicio[];
    Avançado: Exercicio[];
  };
}

function img(texto: string): string {
  return `https://placehold.co/400x260/0d0d1a/3399ff?text=${encodeURIComponent(texto)}`;
}

@Injectable({ providedIn: 'root' })
export class TreinosService {

  private treinos: Treino[] = [
    {
      id: 'treino-musculacao',
      nome: 'Treino de Musculação',
      categoria: 'Musculação',
      horario: '06h - 22h',
      emoji: '💪',
      exercicios: {
        Iniciante: [
          { grupo: 'TREINO A', nome: 'Esteira', imagem: img('Esteira'), descricao: '5 a 10 minutos.' },
          { grupo: 'TREINO A', nome: 'Alongamento', imagem: img('Alongamento'), descricao: 'Alongamento geral antes do treino.' },
          { grupo: 'TREINO A', nome: 'Leg horizontal', imagem: img('Leg horizontal'), descricao: '2 séries de 10 repetições.' },
          { grupo: 'TREINO A', nome: 'Supino máquina', imagem: img('Supino máquina'), descricao: '2 séries de 10 repetições.' },
          { grupo: 'TREINO A', nome: 'Cadeira flexora', imagem: img('Cadeira flexora'), descricao: '2 séries de 10 repetições.' },
          { grupo: 'TREINO A', nome: 'Puxador fechado', imagem: img('Puxador fechado'), descricao: '2 séries de 10 repetições.' },
          { grupo: 'TREINO A', nome: 'Panturrilha em pé', imagem: img('Panturrilha em pé'), descricao: '2 séries de 10 repetições.' },
          { grupo: 'TREINO B', nome: 'Cardio', imagem: img('Cardio'), descricao: '20 a 30 minutos.' },
          { grupo: 'TREINO B', nome: 'Abdominal superior', imagem: img('Abdominal superior'), descricao: '2 séries de 12 repetições.' },
        ],
        Intermediário: [
          { grupo: 'TREINO A', nome: 'Alongamento', imagem: img('Alongamento'), descricao: 'Alongamento geral antes do treino.' },
          { grupo: 'TREINO A', nome: 'Agachamento smith', imagem: img('Agachamento smith'), descricao: '3 séries de 10 repetições.' },
          { grupo: 'TREINO A', nome: 'Leg 45', imagem: img('Leg 45'), descricao: '3 séries de 10 repetições.' },
          { grupo: 'TREINO A', nome: 'Cadeira extensora', imagem: img('Cadeira extensora'), descricao: '4 séries de 10 repetições.' },
          { grupo: 'TREINO A', nome: 'Mesa flexora', imagem: img('Mesa flexora'), descricao: '4 séries de 10 repetições.' },
          { grupo: 'TREINO A', nome: 'Cadeira flexora', imagem: img('Cadeira flexora'), descricao: '3 séries de 10 repetições.' },
          { grupo: 'TREINO A', nome: 'Panturrilha em pé', imagem: img('Panturrilha em pé'), descricao: '3 séries de 12 repetições.' },
          { grupo: 'TREINO A', nome: 'Abdominal superior', imagem: img('Abdominal superior'), descricao: '3 séries de 20 repetições.' },
          { grupo: 'TREINO A', nome: 'Abdominal inferior', imagem: img('Abdominal inferior'), descricao: '3 séries de 20 repetições.' },
          { grupo: 'TREINO B', nome: 'Alongamento', imagem: img('Alongamento'), descricao: 'Alongamento geral antes do treino.' },
          { grupo: 'TREINO B', nome: 'Supino reto', imagem: img('Supino reto'), descricao: '3 séries de 10 repetições.' },
          { grupo: 'TREINO B', nome: 'Fly inclinado', imagem: img('Fly inclinado'), descricao: '3 séries de 10 repetições.' },
          { grupo: 'TREINO B', nome: 'Pulley tríceps', imagem: img('Pulley tríceps'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO B', nome: 'Puxador aberto', imagem: img('Puxador aberto'), descricao: '3 séries de 10 repetições.' },
          { grupo: 'TREINO B', nome: 'Remada sentada', imagem: img('Remada sentada'), descricao: '3 séries de 10 repetições.' },
          { grupo: 'TREINO B', nome: 'Rosca direta', imagem: img('Rosca direta'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO B', nome: 'Cardio', imagem: img('Cardio'), descricao: '30 minutos.' },
        ],
        Avançado: [
          { grupo: 'TREINO A', nome: 'Alongamento', imagem: img('Alongamento'), descricao: 'Alongamento geral antes do treino.' },
          { grupo: 'TREINO A', nome: 'Agachamento livre + afundo', imagem: img('Agachamento livre e afundo'), descricao: '3 séries de 12 repetições (bi set).' },
          { grupo: 'TREINO A', nome: 'Leg 45', imagem: img('Leg 45'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO A', nome: 'Cadeira extensora', imagem: img('Cadeira extensora'), descricao: '4 séries de 12 repetições (drop set).' },
          { grupo: 'TREINO A', nome: 'Cadeira abdutora', imagem: img('Cadeira abdutora'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO A', nome: 'Glúteo polia', imagem: img('Glúteo polia'), descricao: '4 séries de repetição máxima.' },
          { grupo: 'TREINO A', nome: 'Abdominal remador', imagem: img('Abdominal remador'), descricao: '4 séries de 25 repetições.' },
          { grupo: 'TREINO A', nome: 'Abdominal lateral', imagem: img('Abdominal lateral'), descricao: '4 séries de 25 repetições.' },
          { grupo: 'TREINO B', nome: 'Alongamento', imagem: img('Alongamento'), descricao: 'Alongamento geral antes do treino.' },
          { grupo: 'TREINO B', nome: 'Supino reto', imagem: img('Supino reto'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO B', nome: 'Supino inclinado', imagem: img('Supino inclinado'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO B', nome: 'Voador peitoral', imagem: img('Voador peitoral'), descricao: '3 séries de 12 repetições.' },
          { grupo: 'TREINO B', nome: 'Elevação lateral', imagem: img('Elevação lateral'), descricao: '4 séries de 12, 10 e 8 repetições (drop set).' },
          { grupo: 'TREINO B', nome: 'Pulley tríceps', imagem: img('Pulley tríceps'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO B', nome: 'Tríceps corda', imagem: img('Tríceps corda'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO B', nome: 'Mãos na nuca', imagem: img('Mãos na nuca'), descricao: '2 séries de 30 segundos.' },
          { grupo: 'TREINO C', nome: 'Alongamento', imagem: img('Alongamento'), descricao: 'Alongamento geral antes do treino.' },
          { grupo: 'TREINO C', nome: 'Stiff', imagem: img('Stiff'), descricao: '3 séries de 12 repetições.' },
          { grupo: 'TREINO C', nome: 'Mesa flexora unilateral + bilateral', imagem: img('Mesa flexora unilateral e bilateral'), descricao: '4 séries de 12 repetições (bi set).' },
          { grupo: 'TREINO C', nome: 'Cadeira flexora', imagem: img('Cadeira flexora'), descricao: '4 séries de 12 repetições (drop set).' },
          { grupo: 'TREINO C', nome: 'Cadeira adutora', imagem: img('Cadeira adutora'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO C', nome: 'Panturrilha em pé', imagem: img('Panturrilha em pé'), descricao: '4 séries de 15 repetições.' },
          { grupo: 'TREINO C', nome: 'Abdominal remador', imagem: img('Abdominal remador'), descricao: '4 séries de 25 repetições.' },
          { grupo: 'TREINO C', nome: 'Abdominal superior', imagem: img('Abdominal superior'), descricao: '4 séries de 25 repetições.' },
          { grupo: 'TREINO D', nome: 'Alongamento', imagem: img('Alongamento'), descricao: 'Alongamento geral antes do treino.' },
          { grupo: 'TREINO D', nome: 'Puxador aberto', imagem: img('Puxador aberto'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO D', nome: 'Depressão', imagem: img('Depressão'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO D', nome: 'Remada sentada', imagem: img('Remada sentada'), descricao: '3 séries de 12 repetições.' },
          { grupo: 'TREINO D', nome: 'Dorsal voador', imagem: img('Dorsal voador'), descricao: '3 séries de 12 repetições.' },
          { grupo: 'TREINO D', nome: 'Rosca direta', imagem: img('Rosca direta'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO D', nome: 'Rosca martelo', imagem: img('Rosca martelo'), descricao: '4 séries de 12 repetições.' },
          { grupo: 'TREINO D', nome: 'Mãos na nuca', imagem: img('Mãos na nuca'), descricao: '2 séries de 30 segundos.' },
        ],
      },
    },
    {
      id: 'kickboxing',
      nome: 'Kickboxing',
      categoria: 'Artes Marciais',
      horario: '08h - 20h',
      emoji: '🥊',
      exercicios: {
        Iniciante: [
          { nome: 'Jab e direto (combinação básica)', imagem: img('Jab direto'), descricao: '3 séries de 2 minutos.' },
          { nome: 'Cruzado e gancho (combinação básica)', imagem: img('Cruzado gancho'), descricao: '3 séries de 2 minutos.' },
          { nome: 'Chute frontal', imagem: img('Chute frontal'), descricao: '2 séries de 10 repetições por perna.' },
          { nome: 'Peito de pé', imagem: img('Peito de pé'), descricao: '3 séries de 10 repetições por perna.' },
          { nome: 'Guarda e deslocamento', imagem: img('Guarda deslocamento'), descricao: '5 minutos de prática de postura.' },
        ],
        Intermediário: [
          { nome: 'Combinação jab-cruzado-frontal', imagem: img('Combinação jab cruzado frontal'), descricao: '4 rounds de 3 minutos.' },
          { nome: 'Chute lateral', imagem: img('Chute lateral'), descricao: '3 séries de 10 repetições por perna.' },
          { nome: 'Giratório lateral', imagem: img('Giratório lateral'), descricao: '3 séries de 8 repetições por perna.' },
          { nome: 'Esquiva e contra-ataque', imagem: img('Esquiva contra-ataque'), descricao: '5 rounds de 2 minutos.' },
        ],
        Avançado: [
          { nome: 'Combinações com giro', imagem: img('Combinações com giro'), descricao: '3 rounds de 3 minutos.' },
          { nome: 'Chute lateral e direto', imagem: img('Chute lateral direto'), descricao: '4 séries de 8 repetições por perna.' },
          { nome: 'Peito de pé e direto', imagem: img('Peito de pé direto'), descricao: '4 séries de 8 repetições por perna.' },
          { nome: 'Sparring controlado', imagem: img('Sparring controlado'), descricao: '4 rounds de 3 minutos, com supervisão.' },
        ],
      },
    },
    {
      id: 'jiu-jitsu',
      nome: 'Jiu-Jitsu',
      categoria: 'Artes Marciais',
      horario: '07h - 21h',
      emoji: '🥋',
      exercicios: {
        Iniciante: [
          { nome: 'Postura de guarda fechada', imagem: img('Guarda fechada'), descricao: '5 minutos de prática de posicionamento.' },
          { nome: 'Queda básica de quadril', imagem: img('Queda de quadril'), descricao: '3 séries de 8 repetições.' },
          { nome: 'Escape de montada', imagem: img('Escape de montada'), descricao: '4 séries de 5 repetições.' },
        ],
        Intermediário: [
          { nome: 'Passagem de guarda', imagem: img('Passagem de guarda'), descricao: '5 séries de 5 repetições por lado.' },
          { nome: 'Raspagem básica', imagem: img('Raspagem básica'), descricao: '4 séries de 5 repetições.' },
          { nome: 'Finalização com mata-leão', imagem: img('Mata-leão'), descricao: 'Prática técnica assistida, 10 repetições.' },
        ],
        Avançado: [
          { nome: 'Passagem de guarda avançada', imagem: img('Passagem avançada'), descricao: 'Treino de encadeamento, 15 minutos.' },
          { nome: 'Ataques encadeados', imagem: img('Ataques encadeados'), descricao: 'Sequências combinadas, 15 minutos.' },
          { nome: 'Defesa contra múltiplos ataques', imagem: img('Defesa múltiplos ataques'), descricao: 'Treino situacional supervisionado.' },
        ],
      },
    },
    {
      id: 'boxe',
      nome: 'Boxe',
      categoria: 'Artes Marciais',
      horario: '07h - 21h',
      emoji: '🥊',
      exercicios: {
        Iniciante: [
          { nome: 'Jab', imagem: img('Jab'), descricao: '4 rounds de 2 minutos.' },
          { nome: 'Direto', imagem: img('Direto'), descricao: '4 rounds de 2 minutos.' },
          { nome: 'Postura de guarda', imagem: img('Guarda de boxe'), descricao: '5 minutos de prática de postura.' },
        ],
        Intermediário: [
          { nome: 'Combinação jab-direto-upper', imagem: img('Combinação boxe'), descricao: '5 rounds de 3 minutos.' },
          { nome: 'Esquiva lateral', imagem: img('Esquiva lateral'), descricao: '4 séries de 10 repetições.' },
          { nome: 'Trabalho de sombra', imagem: img('Trabalho de sombra'), descricao: '5 rounds de 3 minutos.' },
        ],
        Avançado: [
          { nome: 'Combinações de 5 a 6 golpes', imagem: img('Combinações avançadas'), descricao: '5 rounds de 3 minutos.' },
          { nome: 'Contra-ataques', imagem: img('Contra-ataques'), descricao: '4 rounds de 3 minutos.' },
          { nome: 'Trabalho no aparador (pads)', imagem: img('Trabalho de pads'), descricao: '5 rounds de 3 minutos com parceiro.' },
        ],
      },
    },
    {
      id: 'muay-thai',
      nome: 'Muay Thai',
      categoria: 'Artes Marciais',
      horario: '07h - 21h',
      emoji: '🥊',
      exercicios: {
        Iniciante: [
          { nome: 'Soco jab', imagem: img('Soco jab'), descricao: '4 rounds de 2 minutos.' },
          { nome: 'Chute com a canela (base)', imagem: img('Chute com canela'), descricao: '3 séries de 10 repetições por perna.' },
          { nome: 'Joelhada frontal', imagem: img('Joelhada frontal'), descricao: '3 séries de 10 repetições por perna.' },
        ],
        Intermediário: [
          { nome: 'Cotovelada', imagem: img('Cotovelada'), descricao: '3 séries de 10 repetições por lado.' },
          { nome: 'Combinação soco-chute', imagem: img('Combinação soco chute'), descricao: '4 rounds de 3 minutos.' },
          { nome: 'Clinch básico', imagem: img('Clinch básico'), descricao: '5 minutos de prática guiada.' },
        ],
        Avançado: [
          { nome: 'Combinações completas com clinch', imagem: img('Combinações com clinch'), descricao: '5 rounds de 3 minutos.' },
          { nome: 'Chute giratório', imagem: img('Chute giratório Muay Thai'), descricao: '4 séries de 8 repetições por perna.' },
          { nome: 'Joelhada no clinch', imagem: img('Joelhada no clinch'), descricao: '4 rounds de 3 minutos com parceiro.' },
        ],
      },
    },
    {
      id: 'forro',
      nome: 'Forró',
      categoria: 'Dança',
      horario: '09h - 19h',
      emoji: '💃',
      exercicios: {
        Iniciante: [
          { nome: 'Passo básico do forró', imagem: img('Passo básico forró'), descricao: '10 minutos de prática com contagem de tempo.' },
          { nome: 'Marcação de tempo', imagem: img('Marcação de tempo'), descricao: '5 minutos de prática isolada.' },
          { nome: 'Giro simples', imagem: img('Giro simples'), descricao: '3 séries de 8 repetições.' },
        ],
        Intermediário: [
          { nome: 'Giro duplo', imagem: img('Giro duplo'), descricao: '3 séries de 6 repetições.' },
          { nome: 'Sincronizado com parceiro(a)', imagem: img('Sincronizado dupla'), descricao: '10 minutos de prática em dupla.' },
          { nome: 'Sequência de passos', imagem: img('Sequência de passos'), descricao: '10 minutos de prática encadeada.' },
        ],
        Avançado: [
          { nome: 'Coreografia livre', imagem: img('Coreografia livre'), descricao: '15 minutos de prática criativa.' },
          { nome: 'Giros encadeados', imagem: img('Giros encadeados'), descricao: '4 séries de 6 repetições.' },
          { nome: 'Musicalidade avançada', imagem: img('Musicalidade avançada'), descricao: '15 minutos de prática com variação de ritmo.' },
        ],
      },
    },
    {
      id: 'zumba',
      nome: 'Zumba',
      categoria: 'Dança',
      horario: '09h - 19h',
      emoji: '💃',
      exercicios: {
        Iniciante: [
          { nome: 'Passo básico lateral', imagem: img('Passo lateral'), descricao: '10 minutos de prática.' },
          { nome: 'Movimento de quadril', imagem: img('Movimento de quadril'), descricao: '5 minutos de prática isolada.' },
          { nome: 'Coordenação de braços', imagem: img('Coordenação de braços'), descricao: '5 minutos de prática.' },
        ],
        Intermediário: [
          { nome: 'Sequência coreografada simples', imagem: img('Sequência simples'), descricao: '15 minutos de prática.' },
          { nome: 'Troca de ritmo', imagem: img('Troca de ritmo'), descricao: '10 minutos de prática.' },
          { nome: 'Intensidade moderada', imagem: img('Intensidade moderada'), descricao: '20 minutos contínuos.' },
        ],
        Avançado: [
          { nome: 'Coreografia completa em alta intensidade', imagem: img('Coreografia intensa'), descricao: '25 minutos contínuos.' },
          { nome: 'Trocas rápidas de ritmo', imagem: img('Trocas rápidas'), descricao: '15 minutos de prática.' },
          { nome: 'Freestyle', imagem: img('Freestyle zumba'), descricao: '10 minutos livres.' },
        ],
      },
    },
    {
      id: 'ritmos',
      nome: 'Ritmos',
      categoria: 'Dança',
      horario: '09h - 19h',
      emoji: '👯',
      exercicios: {
        Iniciante: [
          { nome: 'Passo básico', imagem: img('Passo básico ritmos'), descricao: '10 minutos de prática.' },
          { nome: 'Postura corporal', imagem: img('Postura corporal'), descricao: '5 minutos de prática.' },
          { nome: 'Contagem de tempo', imagem: img('Contagem de tempo'), descricao: '5 minutos de prática.' },
        ],
        Intermediário: [
          { nome: 'Sequência de mix de ritmos', imagem: img('Mix de ritmos'), descricao: '15 minutos de prática.' },
          { nome: 'Coordenação motora', imagem: img('Coordenação motora'), descricao: '10 minutos de prática.' },
          { nome: 'Transições', imagem: img('Transições'), descricao: '10 minutos de prática.' },
        ],
        Avançado: [
          { nome: 'Coreografia mista completa', imagem: img('Coreografia mista'), descricao: '20 minutos contínuos.' },
          { nome: 'Improviso', imagem: img('Improviso'), descricao: '10 minutos livres.' },
          { nome: 'Alta intensidade', imagem: img('Alta intensidade ritmos'), descricao: '20 minutos contínuos.' },
        ],
      },
    },
    {
      id: 'funk',
      nome: 'Funk',
      categoria: 'Dança',
      horario: '09h - 19h',
      emoji: '🪩',
      exercicios: {
        Iniciante: [
          { nome: 'Passo básico de funk', imagem: img('Passo básico funk'), descricao: '10 minutos de prática.' },
          { nome: 'Movimento de quadril', imagem: img('Movimento quadril funk'), descricao: '5 minutos de prática.' },
          { nome: 'Groove', imagem: img('Groove'), descricao: '5 minutos de prática.' },
        ],
        Intermediário: [
          { nome: 'Sequência coreografada', imagem: img('Sequência funk'), descricao: '15 minutos de prática.' },
          { nome: 'Isolamentos corporais', imagem: img('Isolamentos corporais'), descricao: '10 minutos de prática.' },
          { nome: 'Sincronia', imagem: img('Sincronia funk'), descricao: '10 minutos de prática em grupo.' },
        ],
        Avançado: [
          { nome: 'Coreografia completa', imagem: img('Coreografia funk'), descricao: '20 minutos contínuos.' },
          { nome: 'Freestyle', imagem: img('Freestyle funk'), descricao: '10 minutos livres.' },
          { nome: 'Alta energia', imagem: img('Alta energia funk'), descricao: '20 minutos contínuos.' },
        ],
      },
    },
    {
  id: 'danca-do-ventre',
  nome: 'Dança do Ventre',
  categoria: 'Dança',
  horario: '09h - 19h',
  emoji: '💃',
  exercicios: {
    Iniciante: [
      { nome: 'Movimento básico de quadril (deslocamento lateral)', imagem: img('Deslocamento lateral'), descricao: '10 minutos de prática, quadril se movendo de um lado ao outro.' },
      { nome: 'Passo básico (caminhada com quadril)', imagem: img('Passo básico'), descricao: '10 minutos de prática, coordenando passos com o movimento do quadril.' },
      { nome: 'Ondulação de braços', imagem: img('Ondulação de braços'), descricao: '5 minutos de prática, braços fluidos acompanhando a respiração.' },
    ],
    Intermediário: [
      { nome: 'Shimmy (vibração de quadril)', imagem: img('Shimmy'), descricao: '10 minutos de prática, vibração rápida e contínua do quadril.' },
      { nome: 'Figura 8 de quadril', imagem: img('Figura 8 de quadril'), descricao: '10 minutos de prática, desenhando o "8" com o quadril.' },
      { nome: 'Giro simples', imagem: img('Giro simples dança do ventre'), descricao: '3 séries de 8 repetições, mantendo o equilíbrio.' },
    ],
    Avançado: [
      { nome: 'Shimmy combinado com deslocamento', imagem: img('Shimmy com deslocamento'), descricao: '10 minutos de prática, vibração de quadril andando pelo espaço.' },
      { nome: 'Ondulação de peito e quadril combinadas', imagem: img('Ondulação peito e quadril'), descricao: '10 minutos de prática, coordenando as duas regiões ao mesmo tempo.' },
      { nome: 'Coreografia com véu', imagem: img('Coreografia com véu'), descricao: '15 minutos de prática, integrando o acessório aos movimentos.' },
    ],
  },
},
    {
      id: 'natacao',
      nome: 'Natação',
      categoria: 'Natação',
      horario: '06h - 20h',
      emoji: '🏊',
      exercicios: {
        Iniciante: [
          { nome: 'Respiração na borda', imagem: img('Respiração na borda'), descricao: '5 séries de 10 repetições.' },
          { nome: 'Flutuação', imagem: img('Flutuação'), descricao: '10 minutos de prática.' },
          { nome: 'Nado cachorrinho', imagem: img('Nado cachorrinho'), descricao: '4 séries de 15 metros.' },
        ],
        Intermediário: [
          { nome: 'Nado crawl (técnica básica)', imagem: img('Nado crawl'), descricao: '6 séries de 25 metros.' },
          { nome: 'Nado costas', imagem: img('Nado costas'), descricao: '6 séries de 25 metros.' },
          { nome: 'Viradas simples', imagem: img('Viradas simples'), descricao: '5 séries de repetição na borda.' },
        ],
        Avançado: [
          { nome: 'Nado borboleta', imagem: img('Nado borboleta'), descricao: '4 séries de 25 metros.' },
          { nome: 'Treino intervalado', imagem: img('Treino intervalado natação'), descricao: '8 séries de 50 metros com descanso curto.' },
          { nome: 'Viradas olímpicas', imagem: img('Viradas olímpicas'), descricao: '6 séries de prática técnica.' },
        ],
      },
    },
    {
      id: 'hidroginastica',
      nome: 'Hidroginástica',
      categoria: 'Natação',
      horario: '06h - 20h',
      emoji: '🏊',
      exercicios: {
        Iniciante: [
          { nome: 'Caminhada na água', imagem: img('Caminhada na água'), descricao: '10 minutos contínuos.' },
          { nome: 'Alongamento aquático', imagem: img('Alongamento aquático'), descricao: '10 minutos de prática.' },
          { nome: 'Movimento de braços', imagem: img('Movimento de braços água'), descricao: '3 séries de 15 repetições.' },
        ],
        Intermediário: [
          { nome: 'Corrida estacionária na água', imagem: img('Corrida na água'), descricao: '15 minutos contínuos.' },
          { nome: 'Exercícios com halteres aquáticos', imagem: img('Halteres aquáticos'), descricao: '4 séries de 12 repetições.' },
          { nome: 'Abdominais na água', imagem: img('Abdominais na água'), descricao: '3 séries de 15 repetições.' },
        ],
        Avançado: [
          { nome: 'Circuito de alta intensidade', imagem: img('Circuito intenso água'), descricao: '20 minutos em circuito.' },
          { nome: 'Saltos aquáticos', imagem: img('Saltos aquáticos'), descricao: '4 séries de 15 repetições.' },
          { nome: 'Treino intervalado aquático', imagem: img('Treino intervalado água'), descricao: '20 minutos com intervalos curtos.' },
        ],
      },
    },
  ];

  getTreinos(): Treino[] {
    return this.treinos;
  }

  getTreinoPorId(id: string): Treino | undefined {
    return this.treinos.find(t => t.id === id);
  }
}