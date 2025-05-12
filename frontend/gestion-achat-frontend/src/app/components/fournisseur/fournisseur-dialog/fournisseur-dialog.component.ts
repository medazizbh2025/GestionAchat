import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Fournisseur } from '../../../models/fournisseur';

@Component({
  selector: 'app-fournisseur-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],  templateUrl: './fournisseur-dialog.component.html',
  styleUrls: ['./fournisseur-dialog.component.scss']
})
export class FournisseurDialogComponent {
  fournisseurForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FournisseurDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fournisseur | null
  ) {
    this.fournisseurForm = this.fb.group({
      nom: [data?.nom || '', Validators.required],
      adresse: [data?.adresse || ''],
      telephone: [data?.telephone || ''],
      email: [data?.email || '', [Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.fournisseurForm.valid) {
      const fournisseur: Fournisseur = {
        id: this.data?.id,
        ...this.fournisseurForm.value
      };
      this.dialogRef.close(fournisseur);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
