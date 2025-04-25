import { Injectable } from '@angular/core';
import { Observable, startWith, Subject, switchMap } from 'rxjs';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Produit } from './produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private refresh$: Subject<void> = new Subject<void>();
  private API_URL: string = `${ environment.API_URL }/produit`;
  constructor(private http: HttpClient) {



   }
  public refresh() {
    this.refresh$.next();
  }
  public findAll(): Observable<Produit[]> {
    return this.refresh$.pipe(
      // Pour forcer une première initialisation de la liste
      startWith(null),
      
      // Transformer le "void" en Array<Todo> en allant chercher les infos
      switchMap(() => {
        return this.http.get<Produit[]>(this.API_URL)
      })
    );
  }
  public save(produit: any) {
    if (produit.id) {
      return this.http.put<Produit>(`${ this.API_URL }/${ produit.id }`, produit, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
    }
    
    return this.http.post<Produit>(this.API_URL, produit);
  }
  
  public delete(produit: any) {
    return this.http.delete<void>(`${ this.API_URL }/${ produit.id }`);
  }
}
