import {Component, OnInit} from '@angular/core';
import {Joueur} from "../../shared/modeles/joueur";
import {JoueursService} from "../../shared/services/joueurs.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MemoryService} from "../../shared/services/memory.service";
import {ParamMemory} from "../../shared/modeles/param-memory";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit{
  public memoryservice:MemoryService;
  public profilForm:FormGroup;
  public choixMemoryChemin:String|undefined;

  get user():Joueur|null{
    return this.jouerService.joueurActuel;
  }

  ///////////////////////////////
  //Initialisations
  ///////////////////////////////
  constructor(private  jouerService:JoueursService, private builder:FormBuilder, memoryService:MemoryService, private router:Router) {
    this.memoryservice=memoryService;
    this.profilForm=builder.group({selectionMemory:[''],selectionTaille:['']});
  }

  ngOnInit(): void {
    //prérenseigner avec les params du joueur
    if (this.user){
      let choix:ParamMemory = Object.setPrototypeOf(this.user.choixMemory, ParamMemory.prototype);
      this.profilForm.controls["selectionMemory"].setValue(this.memoryservice.choixMemory.find((c) => c.valeur===choix.valeur));
      this.choixMemoryChemin=choix.exemple;
      this.profilForm.controls["selectionTaille"].setValue(this.user.tailleGrille);}
    }
  ///////////////////////////////
  //Traitement
  ///////////////////////////////
  public SauvegarderProfil() {
    this.jouerService.modifierProfil(this.profilForm.controls["selectionMemory"].value,this.profilForm.controls["selectionTaille"].value);
    this.router.navigate(["/jouer"]);
  }

  public afficheImage(choix:ParamMemory) {
    this.choixMemoryChemin = choix.exemple;
  }
}
