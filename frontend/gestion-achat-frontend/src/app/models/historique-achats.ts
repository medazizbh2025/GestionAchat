import { CommandeAchat } from './commande-achat';

export interface HistoriqueAchats {
    id?: number;
    dateOperation: Date;
    typeOperation: string;
    commandeAchat: CommandeAchat;
    description: string;
}
