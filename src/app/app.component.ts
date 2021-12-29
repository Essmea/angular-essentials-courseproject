import { Component, OnInit } from '@angular/core';
import { StarWarsService } from './star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  swService: StarWarsService

  constructor(swService: StarWarsService){  //Injectar StarWarsService så att vi kan använda fetchCharacters() metoden.
    this.swService = swService
  }

  ngOnInit(): void {
    this.swService.fetchCharacters(); //Fetchar Star Wars api med metoden fetchCharacters() 
  }
}
