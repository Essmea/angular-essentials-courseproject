import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  characters: [] | any ;
  activatedRoute: ActivatedRoute;
  swService: StarWarsService;
  loadedSide = 'all';
  subscription: Subscription | any;

  /*Injectar activatedRoutes och swService. Vi använder vår service med hjälp utav Dependency injection.
    Default construction som startar så fort komponenten initieras.
    Vi injectar en dependency till komponentens constructor. swService med type StarWarsService.*/
  constructor(activatedRoute: ActivatedRoute, swService: StarWarsService) {
    this.activatedRoute = activatedRoute;
    this.swService = swService;
  }

  /*Denna synchronous funktionen utförs när params ändras. params refererar till varje variabel del vi har i våra routes, exempelvis :side.
Vi reagerar här på ändringar i params med hjälp utav observables som utför kod när vi får in ett nytt värde.
Med hjälp utav subscribe() metoden kan vi observera alla ändringar som sker*/
ngOnInit() {
  this.activatedRoute.params.subscribe(
    (params) => { //async arrowfunction som tar emot params som argument. Denna funktion utförs varje gång params ändras. Det är alltså här vi kan ladda den data som ska synas när vi klickar på en länk och 'byter' router. Varje gång params ändras fetchar vi en ny kopia av characters arrayen.
      this.characters = this.swService.getCharacters(params['side']);
      this.loadedSide = params['side']; //override lodedSide = 'all' och sätter värdet till params valda sida.
    }
  );
 this.subscription = this.swService.charactersChanged.subscribe( //Denna koden utförs efter ovan kod då den är synchronous. När en användaren valt en 'side' till en karaktär flyttas den till rätt tabs sida.
    () => {
      this.characters = this.swService.getCharacters(this.loadedSide)
    }
  );
}

//Denna metoden utförs varje gång komponenten är påväg att förstöras 'destroy'
ngOnDestroy(){
this.subscription.unsubscribe();
}

}
