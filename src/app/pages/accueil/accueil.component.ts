import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Observable } from 'rxjs';
import { RouterTestingHarness } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AnimalService } from '../admin-animaux/animal.service';
import { Animal } from '../admin-animaux/animal';

@Component({
  selector: 'app-accueil',
  standalone: false,
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  animaux$!: Observable<Animal[]>;
  subscriptions: any = [];

  constructor(private authService : AuthService, private router: Router, private service: AnimalService) {}

  ngOnInit(): void {

    setTimeout(() => {
      if (this.authService.user.roleUser == "ADMIN")
        {
          // this.router.navigate([ '/admin-utilisateurs' ]);
        }
      else if (this.authService.user.roleUser == "WORKER")
        {
          this.router.navigate([ '/benevole-profile' ]);
        }
      else if (this.authService.user.roleUser == "CLIENT")
        {
          this.router.navigate([ '/boutique' ]);
        }
      }, 500
    )
    this.animaux$ = this.service.findAll();
  }
}
