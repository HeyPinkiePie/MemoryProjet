import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarreNavigationComponent } from './composants/barre-navigation/barre-navigation.component';
import { AccueilComponent } from './composants/accueil/accueil.component';
import { LoginComponent } from './composants/login/login.component';
import { CreationCompteComponent } from './composants/creation-compte/creation-compte.component';
import { ProfilComponent } from './composants/profil/profil.component';
import { JeuComponent } from './composants/jeu/jeu.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AffScoresComponent} from "./composants/aff-scores/aff-scores.component";
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BarreNavigationComponent,
    AccueilComponent,
    LoginComponent,
    CreationCompteComponent,
    ProfilComponent,
    JeuComponent,
    AffScoresComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
    ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
