import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Produit } from '../../produit';
import { ProduitService } from '../../produit.service';

@Component({
  selector: 'app-admin-boutique',
  standalone: false,
  templateUrl: './admin-boutique.component.html',
  styleUrl: './admin-boutique.component.css'
})
export class AdminBoutiqueComponent implements OnInit, OnDestroy  {
  produitForm!: FormGroup;
  produits$!: Observable<Produit[]>;
  editingProduit!: Produit | null;
  subscriptions: any = [];

  constructor(private service: ProduitService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.produitForm = this.formBuilder.group({
      libelle: this.formBuilder.control('', Validators.required)
    });
    
    this.produits$ = this.service.findAll();
  }

  
  ngOnDestroy(): void {
    this.unsub('addOrEdit');
    this.unsub('delete');
  }

  public addOrEditProduit() {
    this.unsub('addOrEdit');

    this.subscriptions['addOrEdit'] = this.service.save({
      id: this.editingProduit?.id,
      ...this.produitForm.value
    }).subscribe(() => this.service.refresh());

    this.editingProduit = null;
    this.produitForm.get('libelle')?.setValue("");
  }

  public editProduit(produit: Produit) {
    this.produitForm.get('libelle')?.setValue(produit.libelle);
    this.editingProduit = produit;
  }

  public deleteProduit(produit: Produit) {
    this.unsub('delete');

    this.subscriptions['delete'] = this.service.delete(produit).subscribe(() => this.service.refresh());
  }

  private unsub(name: string) {
    if (this.subscriptions[name]) {
      this.subscriptions[name].unsubscribe();
      this.subscriptions[name] = null;
    }
  }
}
