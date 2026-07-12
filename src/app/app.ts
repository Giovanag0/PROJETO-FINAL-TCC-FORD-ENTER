import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './components/footer/footer';
import { Acessibilidade } from './components/acessibilidade/acessibilidade';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Acessibilidade],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gusmao-fitness');
}