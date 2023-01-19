import {Carte} from "./carte";
export class GrilleDeJeu {
  private _nbClick:number; // nb d'actions réalisées par le joueur sur une partie
  private _nbCartesTrouvees:number; // nb de cartes identiques découvertes
  private nbCol:number; // nb de colonnes de la grille
  private nbLignes:number; // nb de lignes de la grille
  private _jeuCartes:Carte[]; // les cartes de la grille


  get nbClick(): number {
    return this._nbClick;
  }

  get jeuCartes(): Carte[] {
    return this._jeuCartes;
  }

  set nbClick(value: number) {
    this._nbClick = value;
  }

  set nbCartesTrouvees(value: number) {
    this._nbCartesTrouvees = value;
  }

  get nbCartesTrouvees(): number {
    return this._nbCartesTrouvees;
  }

  get nbCartes(): number { //nb de cartes au total
    return this.nbLignes*this.nbCol;
  }
  get classeAffichage():string{
    //classe CSS pour l'affichage des grilles
    switch (this.nbCartes){
      case 4: return "classeQuatre";
      case 12: return "classeDouze";
      default : return "classeVingt";
    }
  }
  constructor( nbCol: number, nbLignes: number, private _tableauInit:Carte[]) {
    this._nbClick = 0;
    this.nbCol = nbCol;
    this.nbLignes = nbLignes;
    this._jeuCartes = [];
    this._nbCartesTrouvees=0;
    this.chargerJeu();
  }

  //-----------------------------------------------------------
  //charger aléatoirement les cartes du dossier dans le tableau
  //-----------------------------------------------------------
  private chargerJeu(){
    //je pioche aleatoirement dans le tableau d'images pour remplir la grille de jeu
    for (let i = 0; i < this.nbCartes; i++) {
      let indiceCarte = this.randomInt(0,this._tableauInit.length-1);
      if (!this._tableauInit[indiceCarte]) i--; else{
      this._jeuCartes.push(this._tableauInit[indiceCarte]);
        delete this._tableauInit[indiceCarte];
      // eviter  ! faire fonctionner le slice
      //tableauInit = tableauInit.slice(indiceCarte,1);
      }
    }
  }
  public identique(c1:Carte,c2:Carte):boolean{
    //renvoie vraie si les deux images sont identiques
    return c1.id===c2.id;
  }

  //renvoie l'emplacement aléatoire où piocher dans le tableau d'images
  private randomInt (min:number, max:number) :number{
    return (min + Math.floor ((max - min + 1) * Math.random ()));
  }
}
