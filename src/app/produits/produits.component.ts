import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../model/produit.model';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits !: Produit[]; 
  constructor( private produitService : ProduitService , private router : Router) {
    //this.produits = produitService.listeProduits() ;
  }

  SupprimerProduitDeTableau(produit : Produit) {
    this.produits.forEach((cur , index) => {
      if (produit.idProduit === cur.idProduit) {
        this.produits.slice(index , 1)
      }
    })
  }

  supprimerProduit(produit: Produit) {
    if (confirm("Etes-vous sûr ?"))
      this.produitService.supprimerProduit(produit.idProduit).subscribe(() => {
        console.log("Produit supprimer")
        this.SupprimerProduitDeTableau(produit) 
      })
  }

  ngOnInit(): void {
    this.produitService.listeProduits().subscribe(produit => {
      console.log(produit) ;
      this.produits = produit
    })
  }

}
