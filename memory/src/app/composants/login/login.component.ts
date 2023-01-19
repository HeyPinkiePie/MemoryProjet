import {Component, ElementRef, HostListener, QueryList, ViewChildren} from '@angular/core';
import {JoueursService} from "../../shared/services/joueurs.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  // On récupère le champ qui est taggué avec #inputFocus dans le html, soit le Input nom
  @ViewChildren('inputFocus') inputFocus: QueryList<ElementRef>|undefined;
  // Formulaire
  public loginFormulaire:FormGroup;

  public get user() {
    return this.jouerService.joueurActuel;
  }
  /////////////////////
  //Initialisation
  /////////////////////
  constructor(private  jouerService:JoueursService, private builder:FormBuilder, private router:Router) {
    this.loginFormulaire=this.builder.group({
      champNom:[''],champPwd:[''],
    });
  }

// donner le focus au Nom à l'affichage de l'écran de connexion
  ngAfterViewInit() {
    if (this.inputFocus) {
      this.inputFocus.first.nativeElement.focus();
    }
  }

  /////////////////////
  //Vérifications
  /////////////////////
  nomInvalide() {
    return  this.loginFormulaire.controls["champNom"].value.length<3;
  }

  mdpInvalide() {
    return this.loginFormulaire.controls["champPwd"].value.length<6;
  }
  FormulaireInvalide() {
    return this.mdpInvalide() || this.nomInvalide();
  }

  /////////////////////
  //Traitement
  /////////////////////
  connexion() {
   let ok:boolean= this.jouerService.cnx(this.loginFormulaire.controls["champNom"].value,this.loginFormulaire.controls["champPwd"].value);
   if (ok) this.router.navigate(["/profil"]);
   else alert("cet utilisateur n'existe pas, veuillez vérifier les informations saisies ou créer un compte.")
  }


  // lorsque l'utilisateur clique sur entrer on valide, si OK
  @HostListener('document:keypress', ['$event'])
  reInitBarreEspace(event: KeyboardEvent) {
    if (event.key==="Enter"){
      if (!this.FormulaireInvalide()) this.connexion();
    }
  }

}
