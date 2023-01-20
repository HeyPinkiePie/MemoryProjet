import { Component } from '@angular/core';
import {JoueursService} from "../../shared/services/joueurs.service";
import {Score} from "../../shared/modeles/score";
import {Joueur} from "../../shared/modeles/joueur";

@Component({
  selector: 'app-aff-scores',
  templateUrl: './aff-scores.component.html',
  styleUrls: ['./aff-scores.component.css']
})
export class AffScoresComponent {
public testDate:Date=new Date();
  public get scores(): Score[]{
    return this.scoreServices.scores.sort(this.compareScore);
  }
  public get nbscores():number{
    return (this.scores ? this.scores.length : 0);
  }
  public get user():Joueur|null{
    return this.scoreServices.joueurActuel;
  }
  public nbscoreUser(nom:string):number{
    return this.scoresUser(nom).length;
}
  constructor(private scoreServices:JoueursService) {

  }
  public scoresUser(nomjoueur:string): Score[] {
    // quel est l'user ? Si pas de user on renvoie null, sinon on renvoie les scores du joueur triés par score
    return this.scoreServices.scores.filter((j)=> j.nomJoueur===nomjoueur).sort(this.compareScore);
  }

  private compareScore(s1:Score,s2:Score):number{
    if (s1.score > s2.score) return 1;
    else if (s1.score ===s2.score) return 0;
    else return -1;
  }
}
