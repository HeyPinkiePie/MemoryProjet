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

//donner le focus au Nom à l'affichage de l'écran de connexion
  public ngAfterViewInit() :void{
    if (this.inputFocus) {
      this.inputFocus.first.nativeElement.focus();
    }
  }

  /////////////////////
  //Vérifications
  /////////////////////
  public nomInvalide() :boolean{
    return  this.loginFormulaire.controls["champNom"].value.length<3;
  }

  public mdpInvalide() :boolean{
    return this.loginFormulaire.controls["champPwd"].value.length<6;
  }
  public FormulaireInvalide() : boolean{
    return this.mdpInvalide() || this.nomInvalide();
  }

  /////////////////////
  //Traitement
  /////////////////////
  public connexion() : void{
   let ok:boolean= this.jouerService.cnx(this.loginFormulaire.controls["champNom"].value,this.loginFormulaire.controls["champPwd"].value);
   if (ok) this.router.navigate(["/profil"]);
   else alert("Utilisateur ou mot de pass incorrect(s), veuillez vérifier les informations saisies ou créer un compte.")
  }


  // lorsque l'utilisateur clique sur entrer on valide, si OK
  @HostListener('document:keypress', ['$event'])
  public reInitBarreEspace(event: KeyboardEvent):void {
    if (event.key==="Enter" && !this.FormulaireInvalide()) this.connexion();
  }

}
