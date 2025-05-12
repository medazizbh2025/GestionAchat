import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { CommandeAchat } from '../../../models/commande-achat';
import { CommandeAchatService } from '../../../services/commande-achat.service';

@Component({
  selector: 'app-commande-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule
  ],  templateUrl: './commande-details.component.html',
  styleUrls: ['./commande-details.component.scss']
})
export class CommandeDetailsComponent implements OnInit {
  commande: CommandeAchat | null = null;
  displayedColumns: string[] = ['produit', 'quantite', 'prixUnitaire', 'total'];

  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeAchatService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadCommande(+id);
    }
  }

  loadCommande(id: number): void {
    this.commandeService.getCommandeById(id)
      .subscribe(data => this.commande = data);
  }

  getStatusColor(statut: string): string {
    switch (statut.toLowerCase()) {
      case 'en_cours': return 'primary';
      case 'validée': return 'accent';
      case 'livrée': return 'primary';
      case 'annulée': return 'warn';
      default: return 'primary';
    }
  }

  onEdit(): void {
    // TODO: Implement edit functionality
  }  onCancel(): void {
    if (this.commande && confirm('Are you sure you want to cancel this order?')) {
      this.commandeService.updateStatut(this.commande.id!, 'ANNULEE')
        .subscribe({
          next: () => this.loadCommande(this.commande!.id!),
          error: (error) => console.error('Error canceling order:', error)
        });
    }
  }

  onValidate(): void {
    if (this.commande) {
      this.commandeService.updateStatut(this.commande.id!, 'VALIDEE')
        .subscribe({
          next: () => this.loadCommande(this.commande!.id!),
          error: (error) => console.error('Error validating order:', error)
        });
    }
  }
}
