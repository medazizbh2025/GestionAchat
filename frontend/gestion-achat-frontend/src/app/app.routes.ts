import { Routes } from '@angular/router';
import { FournisseurListComponent } from './components/fournisseur/fournisseur-list/fournisseur-list.component';
import { CommandeListComponent } from './components/commande/commande-list/commande-list.component';
import { CommandeDetailsComponent } from './components/commande/commande-details/commande-details.component';
import { HistoriqueComponent } from './components/historique/historique.component';

export const routes: Routes = [
  { path: '', redirectTo: '/commandes', pathMatch: 'full' },
  { path: 'fournisseurs', component: FournisseurListComponent },
  { path: 'commandes', component: CommandeListComponent },
  { path: 'commandes/:id', component: CommandeDetailsComponent },
  { path: 'historique', component: HistoriqueComponent }
];
