import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../admin-animaux/animal.service';
import { SearchBarService } from '../../search-bar/search-bar.service';
import { Animal } from '../admin-animaux/animal';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-accueil',
  standalone: false,
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']

})
export class AccueilComponent implements OnInit {
  animaux$!: Observable<Animal[]>;

  constructor(private service: AnimalService, private searchService: SearchBarService) {}

  ngOnInit(): void {
    // On écoute la liste complète des animaux
    const animaux$ = this.service.findAll();
  
    // On écoute ce que l'utilisateur tape dans la barre de recherche
    const searchTerm$ = this.searchService.search$.pipe(
      startWith('') // on commence avec rien
    );
  
    // Quand on a la liste ET le texte de recherche
    this.animaux$ = combineLatest([animaux$, searchTerm$]).pipe(
      map(([animaux, searchTerm]) => {
        const term = searchTerm.trim().toLowerCase();
  
        if (term === '') {
          // Si aucun texte, on retourne tous les animaux
          return animaux;
        } else {
          // Sinon on filtre la liste selon nom ou race
          return animaux.filter(animal =>
            animal.nom.toLowerCase().includes(term) ||
            animal.race.toLowerCase().includes(term)
          );
        }
      })
    );
  }

}