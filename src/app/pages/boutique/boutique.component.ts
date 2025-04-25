import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../../produit';
import { ProduitService } from '../../produit.service';

@Component({
  selector: 'app-boutique',
  standalone: false,
  templateUrl: './boutique.component.html',
  styleUrl: './boutique.component.css'
})
export class BoutiqueComponent implements OnInit {
  produits$!: Observable<Produit[]>;
  subscriptions: any = [];

  constructor(private service: ProduitService) { }

  ngOnInit(): void {
    this.produits$ = this.service.findAll();
  }
}
