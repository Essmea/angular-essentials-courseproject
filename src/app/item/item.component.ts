import { Component, OnInit, Input} from '@angular/core';

import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  @Input() character: any; //Vi får karaktären från list komponenten.
  swService: StarWarsService; //swService med type StarWarsService

  constructor(swService: StarWarsService) { //Default construction som startar så fort komponenten initieras. Vi injectar en dependency till componentens constructor. swService med type StarWarsService
    this.swService = swService; //vi referarar till att denna swService som är av type StarWarsServise är lika med swService

  }


  ngOnInit(): void {
  }

  onAssign(side: any) { //När användaren väljer en sida för vår karaktär utförs funktionen onAssign.
  this.swService.onSideChosen({name: this.character.name, side: side}) //Här refererar vi till StarWarsService's funktion onSideChosen som returnerar namn och info om vår valda charactär på rätt tab sida (light eller dark) via clicklisteners i vår item.component.html fil.
  }

}
