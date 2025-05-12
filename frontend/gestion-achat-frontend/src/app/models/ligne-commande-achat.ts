import { CommandeAchat } from './commande-achat';

export interface LigneCommandeAchat {
    id?: number;
    commandeAchat: CommandeAchat;
    produit: string;
    quantite: number;
    prixUnitaire: number;
    montantTotal: number;
}
