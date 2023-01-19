import {ParamMemory} from "./param-memory";

export default interface IJoueurs{
  nom:string;
  email:string;
  mdp:string;
  choixMemory:ParamMemory;
  tailleGrille:string;
  // garder en mémoire le score

}
