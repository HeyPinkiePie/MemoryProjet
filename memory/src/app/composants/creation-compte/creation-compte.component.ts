import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {JoueursService} from "../../shared/services/joueurs.service";
import {Joueur} from "../../shared/modeles/joueur";

@Component({
  selector: 'app-creation-compte',
  templateUrl: './creation-compte.component.html',
  styleUrls: ['./creation-compte.component.css']
})

export class CreationCompteComponent implements OnInit {
  // On récupère le champ qui est taggué avec #inputFocus dans le html, soit le Input nom
  @ViewChildren('inputFocus') inputFocus: QueryList<ElementRef>|undefined;

  public CreationCompteForm: FormGroup;
  public user: Joueur | undefined;

  /////////////////////////
  // Initialisation
  /////////////////////////
  constructor(private builder: FormBuilder, private router: Router, private joueurService: JoueursService) {
    //création du formulaire, ajout des controles.
    this.CreationCompteForm = builder.group({
      champNom: [''],
      champMail: [''],
      champPwd1: [''],
      champPwd2: ['']
    });
  }

  ngOnInit(): void {
    this.user = this.joueurService.joueurActuel;
  }

  /////////////////////////
  // traitement
  /////////////////////////
  //appelé au click sur le bouton "Création du compte".
  public insription() {
    if (!this.formulaireInvalide()) {
      if (this.joueurService.champDejaUtilise("nom", this.CreationCompteForm.controls["champNom"].value))
        alert("Ce nom est déjà pris, choisissez-en un autre svp");
      else {
        if (this.joueurService.champDejaUtilise("email", this.CreationCompteForm.controls["champMail"].value))
          alert("Cette adresse email est liée à un autre compte, veuillez vous connecter ou choisir une autre adresse.");
        else {
            this.joueurService.creerCompte(this.CreationCompteForm.controls["champNom"].value,
            this.CreationCompteForm.controls["champMail"].value,
            this.CreationCompteForm.controls["champPwd1"].value);
            this.router.navigate(['/login']);
        }
      }
    } else {
      alert("il y a des soucis sur le formulaire, veuillez vérifier svp");
    }
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
      !this.CreationCompteForm.controls["champPwd1"].touched
      ;
  }

  public nomInvalide(): boolean {
    let retour: boolean;
    retour = this.CreationCompteForm.controls["champNom"].touched && this.CreationCompteForm.controls["champNom"].value.length < 3;
    //if(this.CreationCompteForm.controls["champNom"].touched && retour);
    return retour;
  }

  public emailInvalide(): boolean {
    let retour: boolean;
    retour = this.CreationCompteForm.controls["champMail"].touched && (this.joueurService.emailValide(this.CreationCompteForm.controls["champMail"].value));
    return retour;
  }

  public mdpInvalide(): boolean {
    let retour: boolean;
    let expressionReguliere = /^(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
    retour = this.CreationCompteForm.controls["champPwd1"].touched && (!expressionReguliere.test(this.CreationCompteForm.controls["champPwd1"].value));
    return retour;
  }

  public mdpDifferents(): boolean {
    let retour: boolean;
    retour = this.CreationCompteForm.controls["champPwd2"].touched &&
      (this.CreationCompteForm.controls["champPwd2"].value !== this.CreationCompteForm.controls["champPwd1"].value);
    return retour;
  }

  /////////////////
  // action
  /////////////////
  // réinitialiser le jeu lors du click sur la barre espace
  @HostListener('document:keypress', ['$event'])
  reInitBarreEspace(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.insription();
    }
  }
// donner le focus au Nom à l'affichage de l'écran d'inscription
  ngAfterViewInit() {
    if (this.inputFocus) {
      this.inputFocus.first.nativeElement.focus();
    }
  }
}
