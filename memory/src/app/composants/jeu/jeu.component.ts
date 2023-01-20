import {Component, HostListener, OnInit} from '@angular/core';
import {Joueur} from "../../shared/modeles/joueur";
import {JoueursService} from "../../shared/services/joueurs.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MemoryService} from "../../shared/services/memory.service";
import {GrilleDeJeu} from "../../shared/modeles/grille-de-jeu";
import {Carte} from "../../shared/modeles/carte";
import {ParamMemory} from "../../shared/modeles/param-memory";
import {Score} from "../../shared/modeles/score";
import {Router} from "@angular/router";

@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.component.html',
  styleUrls: ['./jeu.component.css']
})
export class JeuComponent implements OnInit{
  grilleDeJeuForm:FormGroup;
  public grille!:GrilleDeJeu;
  public jeuFini:boolean=false;

  get user():Joueur|null{
    return this.jouerService.joueurActuel;
  }
  /////////////////////////
  // initialisations
  /////////////////////////
  constructor(private  jouerService:JoueursService, private builder:FormBuilder, private memoryService:MemoryService, private router:Router) {
    this.grilleDeJeuForm=this.builder.group({
      lesVignettes:['']
    });
  }

  ngOnInit(): void {
    this.creaGrille();
  }

  private creaGrille(){
  //création de la grille en fonction des choix de l'utilisateur
  if (this.user){
    let choix:ParamMemory = Object.setPrototypeOf(this.user.choixMemory, ParamMemory.prototype);
    this.grille = this.memoryService.initJeu(this.user.tailleGrille,choix.chemin,choix.extension);
  }
  else {
    //Grille par défaut. A priori l'utilisateur ne peut pas joueur s'il n'est pas connecté?  vérifier règle métier
    this.grille = this.memoryService.initJeu("4 X 3", "chiens", "webp");
  }
}
  /////////////////////////
  // traitement
  /////////////////////////
  public retournerCarte(c:Carte) {
        this.memoryService.jouer(c,this.grille)
        if (this.grille.nbCartesTrouvees=== this.grille.nbCartes)  {
            this.jeuFini=true;
            // on stocke le score
          if (this.user) { this.jouerService.nouveauScore(new Score(this.user.nom,
                                                    this.grille.nbClick / 2,
                                                          this.user.choixMemory.valeur,
                                                          this.user.choixMemory.valeur,
                                                          new Date()));
          }
        }
  }

  @HostListener('document:keypress', ['$event'])
  reInitBarreEspace(event: KeyboardEvent) {
  if (event.key===" "){
    this.jeuFini=false;
    this.creaGrille();
    }
  }

  public vaVoirlesScore() : void {
    this.router.navigate(["/scores"]);
  }
}
