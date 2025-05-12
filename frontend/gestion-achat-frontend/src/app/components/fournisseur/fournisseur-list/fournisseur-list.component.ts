import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FournisseurService } from '../../../services/fournisseur.service';
import { Fournisseur } from '../../../models/fournisseur';

@Component({
  selector: 'app-fournisseur-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],  templateUrl: './fournisseur-list.component.html',
  styleUrls: ['./fournisseur-list.component.scss']
})
export class FournisseurListComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  displayedColumns: string[] = ['nom', 'adresse', 'telephone', 'actions'];

  constructor(private fournisseurService: FournisseurService) {}

  ngOnInit() {
    this.loadFournisseurs();
  }

  loadFournisseurs() {
    this.fournisseurService.getAllFournisseurs()
      .subscribe(data => {
        this.fournisseurs = data;
      });
  }

  addFournisseur() {
    // To be implemented with dialog
  }

  editFournisseur(fournisseur: Fournisseur) {
    // To be implemented with dialog
  }

  deleteFournisseur(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      this.fournisseurService.deleteFournisseur(id)
        .subscribe(() => {
          this.loadFournisseurs();
        });
    }
  }
}
