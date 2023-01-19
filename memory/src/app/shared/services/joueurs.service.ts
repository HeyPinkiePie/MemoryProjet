import {EventEmitter, Injectable} from '@angular/core';
import {Joueur} from "../modeles/joueur";
import {ParamMemory} from "../modeles/param-memory";


@Injectable({
  providedIn: 'root'
})
export class JoueursService {

  public cnxEvent:EventEmitter<Joueur>=new EventEmitter<Joueur>();
  private lesJoueurs:Joueur[] | any;
  private _joueurActuel:Joueur|null ;

  get joueurActuel(): Joueur | null {
   return this._joueurActuel;
  }

  /////////////////////////
  // Initialisation
  /////////////////////////
  constructor() {
    this._joueurActuel=null;
  }

  /////////////////////////
  // traitement
  /////////////////////////
  public creerCompte(nom:string, email:string, mdp:string){

        let jo:Joueur = new Joueur(nom,email,mdp);
        // persistance
        // si le tableau n'est pas déjà défini, récupérer s'il existe, le tableau de joueurs dans le local storage, s'il n'existe pas en créer un nouveau
        if (!this.lesJoueurs) this.initTableauJoueurs();
        //ajouter le joueur au tableau
        this.lesJoueurs.push(jo);
        //sauvegarder ce tableau modifié dans le localStorage
        localStorage.setItem("lesJoueurs",JSON.stringify(this.lesJoueurs));
        // propager la connexion aux autres composants
        //this.cnxEvent.emit(this._joueurActuel);
  }

private initTableauJoueurs(){
  this.lesJoueurs= JSON.parse(localStorage.getItem("lesJoueurs")!);
  if (!this.lesJoueurs) this.lesJoueurs=[];
}

  public cnx(nom:string,mdp:string) : boolean{
    // récupérer s'il existe et s'il n'a pas déjà été récupéré, le tableau de joueurs dans le local storage, sinon c'est qu'il y a un pb
    if (!this.lesJoueurs) {
          this.lesJoueurs = JSON.parse(localStorage.getItem("lesJoueurs")!);
    }
      if (this.lesJoueurs) {
            this._joueurActuel=this.lesJoueurs.find ((us:Joueur) => us.nom === nom && us.mdp===mdp);
                if ( this._joueurActuel) {
                  // propager la connexion aux autres composants
                  this.cnxEvent.emit( this._joueurActuel);
                  return true;
                                }
                            }
     return  false;
  }

  // déconnexion => propagation de l'évenement et réinit des champs (joueur actuel et liste des joueurs)
  public deconnecter() {
    this.cnxEvent.emit(undefined);
    this._joueurActuel=null;
    this.lesJoueurs=undefined;
  }
  public emailValide(mail:string):boolean{
    let expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    return !expressionReguliere.test(mail);
  }

  //modification du profil
  public modifierProfil(choixmemory:ParamMemory,tailleGrille:string){
    if (this.joueurActuel) {
      this.joueurActuel.choixMemory = choixmemory;
      this.joueurActuel.tailleGrille=tailleGrille;
    }
    localStorage.setItem("lesJoueurs",JSON.stringify(this.lesJoueurs));
  }

  champDejaUtilise(champ: string, valeur: string) : boolean{
    if (!this.lesJoueurs) this.initTableauJoueurs();
    let jo:Joueur|undefined;
    switch (champ){
      case 'nom':
        jo=this.lesJoueurs.find((j:Joueur)=> j.nom===valeur);
        break;
      case 'email':
        jo=this.lesJoueurs.find((j:Joueur)=> j.email===valeur);
        break;
    }
    return (jo!==undefined);
  }
}
