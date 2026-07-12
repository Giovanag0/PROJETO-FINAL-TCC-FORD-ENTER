import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { Home } from './pages/home/home';
import { Treinos } from './pages/treinos/treinos';
import { TreinoDetalhe } from './pages/treino-detalhe/treino-detalhe';
import { Planos } from './pages/planos/planos';
import { Pagamento } from './pages/pagamento/pagamento';
import { Contato } from './pages/contato/contato';
import { SobreNos } from './pages/sobre-nos/sobre-nos';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'sobre-nos', pathMatch: 'full' },
  { path: 'sobre-nos', component: SobreNos },
  { path: 'login', component: Login },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
  { path: 'home', component: Home, canActivate: [authGuard] },
  { path: 'treinos', component: Treinos, canActivate: [authGuard] },
  { path: 'treino-detalhe/:id', component: TreinoDetalhe, canActivate: [authGuard] },
  { path: 'planos', component: Planos, canActivate: [authGuard] },
   { path: 'pagamento/:plano', component: Pagamento, canActivate: [authGuard] },
  { path: 'contato', component: Contato, canActivate: [authGuard] },
];