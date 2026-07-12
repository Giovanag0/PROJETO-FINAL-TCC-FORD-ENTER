import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Footer} from '../../components/footer/footer';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [CommonModule, Footer],
  templateUrl: './sobre-nos.html',
  styleUrl: './sobre-nos.css',
})
export class SobreNos implements AfterViewInit, OnDestroy {
  fotos = [
    {
      url: 'imgs/area-musculacao.png',
      legenda: 'Área de musculação completa',
    },
    {
      url: 'imgs/estrutura-academia.png',
      legenda: 'Estrutura moderna e climatizada',
    },
    {
      url: 'imgs/equipamentos-academia.png',
      legenda: 'Equipamentos de última geração',
    },
    {
      url: 'imgs/Aula-em-grupo.png',
      legenda: 'Espaço para aulas em grupo',
    },
  ];

  faqs = [
    { pergunta: 'Preciso agendar a primeira aula?', resposta: 'Não é necessário agendamento. Você pode comparecer à academia em qualquer horário de funcionamento e nossa equipe irá te receber e orientar.', aberto: false },
    { pergunta: 'Posso cancelar meu plano?', resposta: 'Sim! O cancelamento pode ser solicitado a qualquer momento na recepção ou pelo nosso email. O plano permanece ativo até o fim do período pago.', aberto: false },
    { pergunta: 'Quais documentos levar?', resposta: 'Para fazer sua matrícula, traga um documento de identidade com foto (RG ou CNH) e um atestado médico de aptidão física.', aberto: false },
    { pergunta: 'A academia abre aos domingos?', resposta: 'Sim! Funcionamos de segunda a sábado das 06h às 22h e aos domingos das 08h às 14h.', aberto: false },
    { pergunta: 'Tem aulas para iniciantes?', resposta: 'Com certeza! Temos aulas e treinos adaptados para todos os níveis, desde iniciantes até atletas avançados.', aberto: false },
    { pergunta: 'O plano inclui acompanhamento de personal trainer?', resposta: 'O acompanhamento de personal trainer é um serviço adicional. Consulte nossa recepção para saber mais sobre os pacotes disponíveis.', aberto: false },
    { pergunta: 'Posso congelar meu plano?', resposta: 'Sim! Em casos de viagem, lesão ou outros imprevistos, é possível solicitar o congelamento do plano por até 30 dias por ano.', aberto: false },
    { pergunta: 'Tem estacionamento?', resposta: 'Sim, contamos com estacionamento próprio gratuito para nossos alunos.', aberto: false },
  ];

  private observer?: IntersectionObserver;

  constructor(private router: Router, private host: ElementRef<HTMLElement>) {}

  toggleFaq(item: any) {
    item.aberto = !item.aberto;
  }

  ngAfterViewInit() {
    const elementos = this.host.nativeElement.querySelectorAll('.reveal');
    this.observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            this.observer?.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elementos.forEach((el) => this.observer?.observe(el));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  navegarPara(rota: string) {
    this.router.navigate([rota]);
  }
}