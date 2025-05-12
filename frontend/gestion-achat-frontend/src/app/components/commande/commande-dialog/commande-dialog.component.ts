import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommandeAchat } from '../../../models/commande-achat';
import { Fournisseur } from '../../../models/fournisseur';
import { LigneCommandeAchat } from '../../../models/ligne-commande-achat';
import { FournisseurService } from '../../../services/fournisseur.service';

@Component({
  selector: 'app-commande-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],  templateUrl: './commande-dialog.component.html',
  styleUrls: ['./commande-dialog.component.scss']
})
export class CommandeDialogComponent implements OnInit {
  commandeForm: FormGroup;
  fournisseurs: Fournisseur[] = [];
  maxDate: Date = new Date();
  
  constructor(
    private fb: FormBuilder,
    private fournisseurService: FournisseurService,
    public dialogRef: MatDialogRef<CommandeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommandeAchat | null
  ) {
    this.commandeForm = this.fb.group({
      fournisseur: [null, Validators.required],
      dateCommande: [new Date(), [Validators.required]],
      lignes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadFournisseurs();
    if (this.data) {
      this.commandeForm.patchValue({
        fournisseur: this.data.fournisseur,
        dateCommande: new Date(this.data.dateCommande)
      });
      if (this.data.lignesCommande && this.data.lignesCommande.length > 0) {
        this.data.lignesCommande.forEach(ligne => this.addLigne(ligne));
      } else {
        this.addLigne();
      }
    } else {
      this.addLigne();
    }

    // Watch for changes in order lines to update totals
    this.lignesFormArray.valueChanges.subscribe(() => {
      this.calculateTotal();
    });
  }

  get lignesFormArray(): FormArray {
    return this.commandeForm.get('lignes') as FormArray;
  }

  loadFournisseurs(): void {
    this.fournisseurService.getAllFournisseurs()
      .subscribe({
        next: (data) => this.fournisseurs = data,
        error: (error) => console.error('Error loading suppliers:', error)
      });
  }

  createLigneFormGroup(ligne: Partial<LigneCommandeAchat> = {}): FormGroup {
    return this.fb.group({
      produit: [ligne.produit || '', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      quantite: [ligne.quantite || 1, [
        Validators.required,
        Validators.min(1),
        Validators.max(99999)
      ]],
      prixUnitaire: [ligne.prixUnitaire || 0, [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+\.?\d{0,2}$/)
      ]]
    });
  }

  addLigne(ligne: Partial<LigneCommandeAchat> = {}): void {
    if (this.isLastLineValid()) {
      this.lignesFormArray.push(this.createLigneFormGroup(ligne));
    }
  }

  removeLigne(index: number): void {
    if (this.lignesFormArray.length > 1) {
      this.lignesFormArray.removeAt(index);
    }
  }

  isLastLineValid(): boolean {
    if (this.lignesFormArray.length === 0) return true;
    const lastLine = this.lignesFormArray.at(this.lignesFormArray.length - 1);
    return lastLine.valid;
  }

  hasValidLines(): boolean {
    return this.lignesFormArray.length > 0 && this.lignesFormArray.valid;
  }

  calculateLineTotal(index: number): number {
    const ligne = this.lignesFormArray.at(index);
    if (ligne.valid) {
      return ligne.value.quantite * ligne.value.prixUnitaire;
    }
    return 0;
  }

  updateLineTotal(index: number): void {
    const ligne = this.lignesFormArray.at(index);
    if (ligne.value.quantite < 1) {
      ligne.patchValue({ quantite: 1 });
    }
    if (ligne.value.prixUnitaire < 0) {
      ligne.patchValue({ prixUnitaire: 0 });
    }
    this.calculateTotal();
  }

  calculateTotal(): number {
    return this.lignesFormArray.controls.reduce((total, ligne) => {
      if (ligne.valid) {
        const value = ligne.value;
        return total + (value.quantite * value.prixUnitaire);
      }
      return total;
    }, 0);
  }

  onSubmit(): void {
    if (this.commandeForm.valid && this.hasValidLines()) {
      const commande: CommandeAchat = {
        id: this.data?.id,
        fournisseur: this.commandeForm.value.fournisseur,
        dateCommande: this.commandeForm.value.dateCommande,
        lignesCommande: this.commandeForm.value.lignes,
        statut: this.data?.statut || 'EN_COURS',
        montantTotal: this.calculateTotal()
      };
      this.dialogRef.close(commande);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
