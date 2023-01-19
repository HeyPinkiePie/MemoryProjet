export class Carte {
  private _id:string;
  private _etat:EtatCarte;
  private _pathImage:string;

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get etat(): EtatCarte {
    return this._etat;
  }

  set etat(value: EtatCarte) {
    this._etat = value;
  }

  get pathImage(): string {
    if (this._etat===EtatCarte.inconnue) return "assets/question.svg";
    else return this._pathImage;
  }

  set pathImage(value: string) {
    this._pathImage = value;
  }

  constructor(id: string, etat: EtatCarte, pathImage: string) {
    this._id = id;
    this._etat = etat;
    this._pathImage = pathImage;
  }
}
export enum EtatCarte{
  decouverte,
  inconnue
}
