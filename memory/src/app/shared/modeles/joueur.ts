import IJoueurs from "./IJoueurs";
import {ParamMemory} from "./param-memory";

export class Joueur implements IJoueurs{
  email: string;
  mdp: string;
  nom: string;
  choixMemory: ParamMemory;
  tailleGrille: string;

  constructor(nom: string, email: string, mdp: string) {
    this.email = email;
    this.mdp = mdp;
    this.nom = nom;
    //par défaut, choix d'une grille et d'une taille de grille pour un nouveau joueur
    this.choixMemory= new ParamMemory("Animaux","animaux","webp","assets/animaux/memory_detail_animaux.png");
    this.tailleGrille="4 X 3";
  }

}
