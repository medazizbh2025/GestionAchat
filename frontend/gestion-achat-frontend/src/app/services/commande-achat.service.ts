import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandeAchat } from '../models/commande-achat';

@Injectable({
  providedIn: 'root'
})
export class CommandeAchatService {
  private apiUrl = 'http://localhost:8080/api/commandes';

  constructor(private http: HttpClient) { }

  getAllCommandes(): Observable<CommandeAchat[]> {
    return this.http.get<CommandeAchat[]>(this.apiUrl);
  }

  getCommandeById(id: number): Observable<CommandeAchat> {
    return this.http.get<CommandeAchat>(`${this.apiUrl}/${id}`);
  }

  createCommande(commande: CommandeAchat): Observable<CommandeAchat> {
    return this.http.post<CommandeAchat>(this.apiUrl, commande);
  }

  updateCommande(id: number, commande: CommandeAchat): Observable<CommandeAchat> {
    return this.http.put<CommandeAchat>(`${this.apiUrl}/${id}`, commande);
  }

  deleteCommande(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateStatut(id: number, statut: string): Observable<CommandeAchat> {
    return this.http.patch<CommandeAchat>(`${this.apiUrl}/${id}/statut`, { statut });
  }
}
