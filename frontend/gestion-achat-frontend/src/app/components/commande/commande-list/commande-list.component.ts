import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommandeAchatService } from '../../../services/commande-achat.service';
import { CommandeAchat } from '../../../models/commande-achat';

@Component({
  selector: 'app-commande-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.scss']
})
export class CommandeListComponent implements OnInit {
  commandes: CommandeAchat[] = [];
  displayedColumns: string[] = ['dateCommande', 'fournisseur', 'montantTotal', 'statut', 'actions'];

  constructor(private commandeService: CommandeAchatService) {}

  ngOnInit() {
    this.loadCommandes();
  }

  loadCommandes() {
    this.commandeService.getAllCommandes()
      .subscribe(data => {
        this.commandes = data;
      });
  }

  getStatusColor(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'en_cours': return 'primary';
      case 'validée': return 'accent';
      case 'livrée': return 'success';
      case 'annulée': return 'warn';
      default: return 'primary';
    }
  }

  addCommande() {
    // To be implemented with dialog
  }

  editCommande(commande: CommandeAchat) {
    // To be implemented with dialog
  }

  viewDetails(commande: CommandeAchat) {
    // To be implemented with navigation
  }

  deleteCommande(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.commandeService.deleteCommande(id)
        .subscribe(() => {
          this.loadCommandes();
        });
    }
  }
}
