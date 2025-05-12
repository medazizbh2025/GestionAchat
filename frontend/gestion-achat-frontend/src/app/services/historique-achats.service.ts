import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HistoriqueAchats } from '../models/historique-achats';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueAchatsService {
  private apiUrl = 'http://localhost:8080/api/historique';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  getAllHistorique(): Observable<HistoriqueAchats[]> {
    return this.http.get<HistoriqueAchats[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getHistoriqueById(id: number): Observable<HistoriqueAchats> {
    return this.http.get<HistoriqueAchats>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getHistoriqueByCommande(commandeId: number): Observable<HistoriqueAchats[]> {
    return this.http.get<HistoriqueAchats[]>(`${this.apiUrl}/commande/${commandeId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  createHistorique(historique: HistoriqueAchats): Observable<HistoriqueAchats> {
    return this.http.post<HistoriqueAchats>(this.apiUrl, historique)
      .pipe(
        catchError(this.handleError)
      );
  }
}
