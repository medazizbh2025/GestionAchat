import { Fournisseur } from './fournisseur';
import { LigneCommandeAchat } from './ligne-commande-achat';

export interface CommandeAchat {
    id?: number;
    dateCommande: Date;
    fournisseur: Fournisseur;
    lignesCommande: LigneCommandeAchat[];
    statut: string;
    montantTotal: number;
}
