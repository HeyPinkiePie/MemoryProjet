import { Injectable } from '@angular/core';
import {GrilleDeJeu} from "../modeles/grille-de-jeu";
import {Carte, EtatCarte} from "../modeles/carte";
import {ParamMemory} from "../modeles/param-memory";

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
 //variables utiles au jeu
  private nbCartesRetournees:number=0;
  private cartesAtester:Carte[]=[];


  // données utiles aux écrans
 public choixMemory:ParamMemory[];

public choixTailleGrille:String[]=["2 X 2", "4 X 3","5 X 4"];

constructor() {

  this.choixMemory = [new ParamMemory("Alphabet","alphabet-scrabble","png","assets/alphabet-scrabble/memory_detail_scrabble.png"),
    new ParamMemory("Animaux","animaux","webp","assets/animaux/memory_detail_animaux.png"),
    new ParamMemory("Animaux domestiques","animauxdomestiques","jpg","assets/animauxdomestiques/memory_detail_animaux_domestiques.png"),
    new ParamMemory("Chiens","chiens","webp","assets/chiens/memory_details_chiens.png"),
    new ParamMemory("Dinosaures","dinosaures","jpg","assets/dinosaures/memory_detail_dinosaures.png")];
}

  //--------------------------------
  // initialisation des elements
  //--------------------------------
  public initJeu(taille:string,jeu:string,extension:string) : GrilleDeJeu{

      this.nbCartesRetournees=0;
      this.cartesAtester=[];

    let nbcol:number; let nblign:number;
    switch (taille){
      case "2 X 2":
        nbcol=2;nblign=2;
        break;
      case "4 X 3":
        nbcol=4;nblign=3;
        break;
      default:
        nbcol=5;nblign=4;
        break;
    }

    //étape 1 : créer un tableau de cartes avec toutes les images dans lesquelles on peut piocher
    let tableauInit:Carte[]=[];
    let nbcartesAplacer=nblign*nbcol/2;
    for (let i = 0; i < nbcartesAplacer; i++) {

      //chaque carte est ajoutée deux fois, mais il s'agit de deux objets différents ayant le même id
      tableauInit.push(new Carte("id"+i,EtatCarte.inconnue, "assets/"+jeu + "/"+ (i + 1)+"."+ extension));
      tableauInit.push(new Carte("id"+i,EtatCarte.inconnue,"assets/"+jeu +  "/"+ (i + 1)+"."+ extension));
    }
    //étape 2 : créer et retourner la grille
    return new GrilleDeJeu(nbcol,nblign,tableauInit);
  }

  //--------------------------------
  // Jouer une partie
  //--------------------------------
  private cacherCartes(c1:Carte,c2:Carte){
    c1.etat=EtatCarte.inconnue;
    c2.etat=EtatCarte.inconnue;
  }

  public jouer(carte:Carte, grille:GrilleDeJeu){
    if (carte.etat===EtatCarte.inconnue){
        grille.nbClick++;
        carte.etat=EtatCarte.decouverte;
        this.cartesAtester.push(carte);
        if (++this.nbCartesRetournees==2) {
            this.nbCartesRetournees=0;
            if (this.cartesAtester[0].id!==this.cartesAtester[1].id){
                setTimeout(this.cacherCartes,500,this.cartesAtester[0],this.cartesAtester[1]);
            }
            else  {
              grille.nbCartesTrouvees+=2;
            }
            this.cartesAtester=[];
        }
    }
  }
}
