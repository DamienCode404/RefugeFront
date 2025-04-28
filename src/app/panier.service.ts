import { Injectable } from '@angular/core';
import { Produit } from './produit';
import { ProduitService } from './produit.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private _articles: Produit[] = [];

  constructor(private produitService: ProduitService) { }

  get articles(): Produit[] {
    return this._articles;
  }

  ajouter(produit: Produit) {
    this._articles.push(produit);

    this.produitService.decrementerStock(produit.id).subscribe({
      next: () => {
        produit.stock -= 1; // A changer : le stocke décrémente localement
        console.log(`Stock du produit ${produit.libelle} diminué de 1`);
      },
      error: () => {
        console.log(`Erreur lors de la diminution du stock pour ${produit.libelle}`);
      }
    });
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
