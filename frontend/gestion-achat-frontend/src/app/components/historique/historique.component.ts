import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { inject } from '@angular/core';
import { HistoriqueAchats } from '../../models/historique-achats';
import { HistoriqueAchatsService } from '../../services/historique-achats.service';

type OperationType = 'CREATION' | 'VALIDATION' | 'LIVRAISON' | 'ANNULATION';

@Component({
  selector: 'app-historique',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatChipsModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit, AfterViewInit {
  private historiqueService = inject(HistoriqueAchatsService);
  private snackBar = inject(MatSnackBar);
  
  dataSource = new MatTableDataSource<HistoriqueAchats>([]);
  displayedColumns: string[] = [
    'dateOperation',
    'typeOperation',
    'commande',
    'fournisseur',
    'montant',
    'utilisateur'
  ];
  isLoading = false;
  errorMessage = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadHistorique();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
    // Custom sort functions for nested objects
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'fournisseur':
          return item.commandeAchat.fournisseur.nom.toLowerCase();
        case 'montant':
          return item.commandeAchat.montantTotal;
        case 'dateOperation':
          return new Date(item.dateOperation).getTime();
        default:
          return (item[property as keyof HistoriqueAchats] as string).toLowerCase();
      }
    };
  }

  loadHistorique(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.historiqueService.getAllHistorique()
      .subscribe({
        next: (data: HistoriqueAchats[]) => {
          this.dataSource.data = data;
          this.isLoading = false;
          if (data.length === 0) {
            this.showMessage('No history records found');
          }
        },
        error: (error: Error) => {
          console.error('Error loading history:', error);
          this.isLoading = false;
          this.errorMessage = 'Failed to load history. Please try again.';
          this.showMessage('Error loading history', 'error');
        }
      });
  }

  getOperationColor(type: string): 'primary' | 'accent' | 'warn' {
    switch (type.toUpperCase() as OperationType) {
      case 'CREATION': return 'primary';
      case 'VALIDATION': return 'accent';
      case 'LIVRAISON': return 'primary';
      case 'ANNULATION': return 'warn';
      default: return 'primary';
    }
  }

  private showMessage(message: string, type: 'error' | 'info' = 'info'): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type === 'error' ? ['error-snackbar'] : []
    });
  }
}
