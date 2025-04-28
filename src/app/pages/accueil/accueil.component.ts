import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { RouterTestingHarness } from '@angular/router/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: false,
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {

  constructor(private authService : AuthService, private router: Router) {}

  ngOnInit(): void {

    setTimeout(() => {
      if (this.authService.user.roleUser == "ADMIN")
        {
          this.router.navigate([ '/admin-utilisateurs' ]);
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

  }
}
