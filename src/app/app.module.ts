import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { NavigationComponent } from './navigation/navigation.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AdminUtilisateursComponent } from './pages/admin-utilisateurs/admin-utilisateurs.component';
import { AdminAnimauxComponent } from './pages/admin-animaux/admin-animaux.component';
import { AdminBoutiqueComponent } from './pages/admin-boutique/admin-boutique.component';
import { BoutiqueComponent } from './pages/boutique/boutique.component';
import { PanierComponent } from './pages/panier/panier.component';
import { BenevoleProfileComponent } from './pages/benevole-profile/benevole-profile.component';
import { BenevoleAjoutComponent } from './pages/benevole-ajout/benevole-ajout.component';
import { jwtHeaderInterceptor } from './jwt-header.interceptor';
import { AscTextFieldComponent } from './asc-text-field/asc-text-field.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    NavigationComponent,
    InscriptionComponent,
    AccueilComponent,
    AdminUtilisateursComponent,
    AdminAnimauxComponent,
    AdminBoutiqueComponent,
    BoutiqueComponent,
    PanierComponent,
    BenevoleProfileComponent,
    BenevoleAjoutComponent,
    AscTextFieldComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withFetch(), withInterceptors([ jwtHeaderInterceptor ])) // Remplace l'import de HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
