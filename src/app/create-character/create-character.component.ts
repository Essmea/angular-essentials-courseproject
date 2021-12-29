import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service'; //Import av vår StarWarsService

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [ //Property för att välja sida i formuläret. En aray med olika js objekt. Display värdet är vad som blir displayat i dropdownen.
    {display:'None', value:''},
    {display:'Light', value:'light'},
    {display:'Dark', value:'dark'}]

  swService: StarWarsService; //Skapar en property av vår swService

  constructor(swService: StarWarsService) { //Injectar våran StarwarsService där vi har vår metod för att pusha upp vår submittade karaktär till characters arrayen.
    this.swService = swService; //Denna swService som är injectad från StarWarsService är lika med våran property swService.
   }

  ngOnInit(): void {
  }

  /*Denna funktion utförs när användaren trycker på knappen i add character formuläret. Vi tar emot submittedForm från vår template.
  Vi kallar på vår metod addCharacter i StarWarsService och passerar värdet av namn och sida som vi får från vårt formulär.*/
  onSubmit(submittedForm: any) {
    if (submittedForm.invalid) { //Om vårat formulär är invalid, alltså inte ifyllt då det står som required, stoppar vi submittandet av vårt formulär genom att endast returnera.
      return;
    }
    this.swService.addCharacter(submittedForm.value.name, submittedForm.value.side)

    console.log(submittedForm.value)
  }

}
