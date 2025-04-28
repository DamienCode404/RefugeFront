import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../../produit';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from '../../produit.service';
import { PanierService } from '../../panier.service';

@Component({
  selector: 'app-boutique-detail',
  standalone: false,
  templateUrl: './boutique-detail.component.html',
  styleUrl: './boutique-detail.component.css'
})

export class BoutiqueDetailComponent implements OnInit {
  private _produit!: Produit;
  constructor(
    private route: ActivatedRoute,
    private service: ProduitService,
    private panierService: PanierService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.findById(id).subscribe({
        next: produit => this._produit = produit,
        error: () => this._produit = new Produit(0, "404", "404", 0, 0, "404")
      });
    });
  }

  public get produit(): Produit {
    return this._produit;
  }

  ajouterAuPanier(): void {
    this.panierService.ajouter(this._produit);
  }
}
