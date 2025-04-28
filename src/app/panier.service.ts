import { Injectable } from '@angular/core';
import { Produit } from './produit';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private _articles: Produit[] = [];

  constructor() { }

  get articles(): Produit[] {
    return this._articles;
  }

  ajouter(produit: Produit) {
    this._articles.push(produit);
  }

  retirer(id: number) {
    this._articles = this._articles.filter(p => p.id !== id);
  }

  get total(): number {
    return this._articles.reduce((sum, article) => sum + article.prix, 0);
  }

  vider() {
    this._articles = [];
  }
}
