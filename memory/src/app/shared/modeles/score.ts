export class Score{
  private _nomJoueur:string;
  private _score:number;
  private _tailleGrille:string;
  private _choixMemory:string;
  private _laDate:Date;

  get laDate(): Date {
    return this._laDate;
  }

  set laDate(value: Date) {
    this._laDate = value;
  }

  public dateFormatee():string{
      return this._laDate.toLocaleString(`fr-CH`);
  }

  get nomJoueur(): string {
    return this._nomJoueur;
  }

  set nomJoueur(value: string) {
    this._nomJoueur = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  get tailleGrille(): string {
    return this._tailleGrille;
  }

  set tailleGrille(value: string) {
    this._tailleGrille = value;
  }

  get choixMemory(): string {
    return this._choixMemory;
  }

  set choixMemory(value: string) {
    this._choixMemory = value;
  }

  constructor(nomJoueur: string, score: number, tailleGrille: string, choixMemory: string, quelledate: Date) {
    this._nomJoueur = nomJoueur;
    this._score = score;
    this._tailleGrille = tailleGrille;
    this._choixMemory = choixMemory;
    this._laDate=quelledate;
    console.log(this.dateFormatee());
  }
}
