import { Component } from '@angular/core';
import {JoueursService} from "../../shared/services/joueurs.service";
import {Observable} from "rxjs";
import {Joueur} from "../../shared/modeles/joueur";
import {Router} from "@angular/router";

@Component({
  selector: 'app-barre-navigation',
  templateUrl: './barre-navigation.component.html',
  styleUrls: ['./barre-navigation.component.css']
})
export class BarreNavigationComponent{
  public user: Observable<Joueur> | undefined;
  ///////////////////////////
  // Initialisation
  ///////////////////////////
  constructor(private jouerService:JoueursService,private router:Router) {
    this.user = this.jouerService.cnxEvent;
  }
  ///////////////////////////
  // Traitement
  ///////////////////////////
  Deconnecter() {
    this.jouerService.deconnecter();
    this.router.navigate(["/accueil"]);
  }
}
