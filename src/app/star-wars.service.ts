//En service är en typescript class som vi kan kalla på i andra komponenter.

import { Injectable } from "@angular/core"; //Importerar Injectable från @angular/core.
import { Subject } from "rxjs";
import { LogService } from "./log.service";
import { HttpClient, HttpResponse  } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable() //Gör det möjligt för Angular att lägga till en annan service in i denna service.
export class StarWarsService {

  //vår characters array.
  private characters = [
    { name: 'Luke Skywalker', side: '' },
    { name: 'Darth Vader', side: '' }
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>(); //objekt från rxjs paketet. eventEmitter hade också fungerat.
  http: HttpClient;

/*Vi använder oss igen utav Dependency injection för att kalla på vår LogService i vår StarWarsService.
Vi injectar också HttpClientModule som ger os möjligheten att skicka och posta request till en api.
I max kurs visade han en gammal version vilket betydde att man bara använde httpModule, jag fick själv leta och räkna ut att man skulle använda httpClientModule och httpClient istället*/
  constructor(logService:LogService, http: HttpClient ) {
    this.logService = logService;
    this.http = http;
  }

/*Async kod, genomförs bara när svaret finns där. Vi skickar en request till Starwars APIet med get metoden och subscribar till den med en response metod som consol loggar det vi får tillbaka.
Då jag använder den senaste versionen av rxjs i mitt projekt fick jag lite småproblem när jag skulle fetcha SWAPI då Max använde rxjs version 6
detta lyckades jag dock fixa genom att lägga till .pipe(map...) istället för bara .map och ta bort .json på const data = response.json*/
fetchCharacters() {
  this.http.get('https://swapi.dev/api/people')
  .pipe(map //för att transformera min data så att jag kan använda den
    ((response : any) => {
    const data = response //Den extraherade datan sparas i const data
    const extractedChars = data.results //Vi hittar extractedChars på data.results på api sidan
    const chars = extractedChars.map //Chars är resultatet av extractedChars.map()
      ((char:any) => { return {name: char.name, side: ''} //Vi väljer att endast returnera namn och en tom string för side.
      })
      return chars})) //Vi returnerar chars som alltså är vår extraherade data för alla karaktärer med endast namn och sida.
    .subscribe(
      (data: any) => {
        console.log(data)
        this.characters = data
        this.charactersChanged.next(); //kallar på next metoden på charactersChanged för att visa applikationen att karaktärerna har ändrats så att sidan visar vår hämtade lista när datan laddas in.
      })

  }

  //Denna funktion använder chosenList, alltså vald lista, för att hämta de karaktärerna som är på den lista vi valt. All, light eller dark.
  getCharacters(chosenList: any) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    })
  }

  /*Via clicklistener i vår item komponent trycker användaren på light eller dark knappen under en karaktär och vi kallar på funktionen onAssign
  som i sin tur kallar på onSideChosen i vår StarWarsService och vår character blir positionerad på den sidan vi har valt, light eller dark.
  */
  onSideChosen(charInfo:any) {
    const pos = this.characters.findIndex((char) => {
      return char.name === charInfo.name;
    })

    this.characters[pos].side = charInfo.side;
    this.charactersChanged.next(); //vi emittar nästa värde med next
    this.logService.writeLog('Changed side of ' + charInfo.name + ', new side: ' + charInfo.side) //Här loggar vi ut texten 'Changed side of' och karaktärens namn och vald sida.
  }

  //Metod för att lägga till karaktärer från fårt form till vår lista av karaktärer.
  addCharacter(name:string, side:string) {
    const pos = this.characters.findIndex((char) => { //Vi söker efter positionen av vår karaktär i vår characters array via vår findIndex metod och ser så att char name matchar namnet av vår skapade karaktär
      return char.name === name;
    })
    if (pos !== -1) { //Om pos är allt annat än -1, vilket innebär att om värdet redan finns i vår array så vill vi bara returnera existerande värde.
      return;
    }
    const newChar = {name: name, side: side}; //Vi skapar en variabel för ett nytt karaktärs objekt som har ett namn och en sida
    this.characters.push(newChar); //Vi pushar upp vår nya karaktär till vår characters array.
  }
}
