import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccueilComponent} from "./composants/accueil/accueil.component";
import {ProfilComponent} from "./composants/profil/profil.component";
import {CreationCompteComponent} from "./composants/creation-compte/creation-compte.component";
import {LoginComponent} from "./composants/login/login.component";
import {JeuComponent} from "./composants/jeu/jeu.component";
import {AffScoresComponent} from "./composants/aff-scores/aff-scores.component";
//const routes: Routes = [];

const routes: Routes = [
  {path: 'accueil', component:AccueilComponent},
  {path: 'profil', component:ProfilComponent},
  {path: 'creerCpte', component:CreationCompteComponent},
  {path: 'login', component:LoginComponent},
  {path: 'jouer', component:JeuComponent},
  {path: 'scores', component:AffScoresComponent},
  {path: '', redirectTo:'/accueil',pathMatch:"full"},
  {path: '**', component:AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
