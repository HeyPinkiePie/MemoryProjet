export class ParamMemory {
  private _valeur:string;
  private _chemin:string;
  private _extension:string;
  private _exemple:string;

  get valeur(): string { // choix de mémory qui s'affichera dans la liste de selection del'écran profil
    return this._valeur;
  }

  get chemin(): string { // chemin associé à ce choix
    return this._chemin;
  }

  get extension(): string { //extension des images de cette liste
    return this._extension;
  }

  get exemple(): string { // chemin vers l'image exemple à afficher sur l'écran Profil
    return this._exemple;
  }

  constructor(valeur: string, chemin: string, extension: string,exemple:string) {
    this._valeur = valeur;
    this._chemin = chemin;
    this._extension = extension;
    this._exemple=exemple;
  }
}
