import {Component, ElementRef, HostListener,  QueryList, ViewChildren} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn} from "@angular/forms";
import {Router} from "@angular/router";
import {JoueursService} from "../../shared/services/joueurs.service";
import {Joueur} from "../../shared/modeles/joueur";

@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})

export class CreationCompteComponent {
  // On récupère le champ qui est taggué avec #inputFocus dans le html, soit le Input nom
  @ViewChildren('inputFocus') inputFocus: QueryList<ElementRef>|undefined;

  public CreationCompteForm: FormGroup;
  public user: Joueur | null;

  /////////////////////////
  // Initialisation
  /////////////////////////
  constructor(private builder: FormBuilder, private router: Router, private joueurService: JoueursService) {
    this.user = this.joueurService.joueurActuel;
    //création du formulaire, ajout des controles.
    this.CreationCompteForm = builder.group({
      champNom: ['',this.champUniqueValidator('nom',"le nom n'est pas unique")],
      champMail: ['',this.champUniqueValidator('email',"l'email n'est pas unique")],
      champPwd1: [''],
      champPwd2: ['']
    });
  }

  /////////////////////////
  // traitement
  /////////////////////////
  //appelé au click sur le bouton "Création du compte".
  public insription() {
      if (!this.formulaireInvalide()) {
          if (this.CreationCompteForm.controls["champNom"].invalid ||this.CreationCompteForm.controls["champMail"].invalid)
            alert((this.CreationCompteForm.controls["champNom"].getError('message')?.value ?? "" ) + "\n " +
                  (this.CreationCompteForm.controls["champMail"].getError('message')?.value ?? ""));
        else {
          this.joueurService.creerCompte(this.CreationCompteForm.controls["champNom"].value,
                    this.CreationCompteForm.controls["champMail"].value,
                    this.CreationCompteForm.controls["champPwd1"].value);
          this.router.navigate(['/login']);
        }
      }
      else alert("il y a des soucis sur le formulaire, veuillez vérifier svp");
  }

  //appelé au click sur le bouton "Annuler", vide les champs de saisie.
  public resetForm() {
    this.CreationCompteForm.reset();
  }

  /////////////////////////////////////////////////////
  // zone de validation des champs et du formulaire
  /////////////////////////////////////////////////////
  private formulaireInvalide(): boolean {
    return this.nomInvalide() ||
      this.emailInvalide() ||
      this.mdpInvalide() ||
      this.mdpDifferents() ||
      !this.CreationCompteForm.controls["champNom"].touched ||
      !this.CreationCompteForm.controls["champMail"].touched ||
      !this.CreationCompteForm.controls["champPwd1"].touched;
  }

  public nomInvalide(): boolean {
    return this.CreationCompteForm.controls["champNom"].touched &&
          this.CreationCompteForm.controls["champNom"].value.length < 3;
  }

  public emailInvalide(): boolean {
    return this.CreationCompteForm.controls["champMail"].touched &&
            (this.joueurService.emailValide(this.CreationCompteForm.controls["champMail"].value));
  }

  public mdpInvalide(): boolean {
    let expressionReguliere = /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
   return this.CreationCompteForm.controls["champPwd1"].touched &&
            (!expressionReguliere.test(this.CreationCompteForm.controls["champPwd1"].value));
  }

  public mdpDifferents(): boolean {
    return  this.CreationCompteForm.controls["champPwd2"].touched &&
      (this.CreationCompteForm.controls["champPwd2"].value !== this.CreationCompteForm.controls["champPwd1"].value);
  }
  public  champUniqueValidator(champ: string, message:string):ValidatorFn{
    return (control:AbstractControl):{[key:string]:any}|null=>{
      const nope= this.joueurService.champDejaUtilise(champ,control.value);
      return nope ? {'message':{value: message}} : null;};
  }
  /////////////////
  // action
  /////////////////
  // réinitialiser le jeu lors du click sur la barre espace
  @HostListener('document:keypress', ['$event'])
  public reInitBarreEspace(event: KeyboardEvent) :void {
    if (event.key === "Enter") {
      this.insription();
    }
  }
// donner le focus au Nom à l'affichage de l'écran d'inscription
  public ngAfterViewInit() {
    if (this.inputFocus) {
      this.inputFocus.first.nativeElement.focus();
    }
  }
}
