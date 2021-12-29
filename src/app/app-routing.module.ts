import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router'; //Importerar routing funktionen

import { TabsComponent } from "./tabs/tabs.component";
import { ListComponent } from "./list/list.component";



const routes= [ //En array av Js objekt. Path är URLen och component är den komponent som laddas in.
  {path:'characters',component: TabsComponent, children: [ //Child routing: med propertien children kan vi skapa en array av router objekt som då i detta fallet blir 'barn' till TabsCOmponent.
    { path: '', redirectTo: 'all', pathMatch: 'full'}, //laddar :side med 'all' som värde. PatchMatch: 'full' gör att hela pathen måste vara tom om redirectTo ska triggas.
    { path: ':side', component: ListComponent } //:side ersätts av exempelvis /characters/dark eller /characters/light vars värde hämtas från vår ListComponent
  ] },
  {path:'new-character', loadChildren: () => import("./create-character/create-character.module").then(m => m.CreateCharacterModule)},//lazy loadar CreateCharacterModule med loadChildren när vi är på path new-character, koden laddas in när vi faktiskt ska använda den.
  {path:'**', redirectTo: '/characters' } //Måste vara sista objektet. Fångar upp alla routes. Vid en felaktig route redirectas vi till tabs komponenten.
];


@NgModule({
  exports:[
    RouterModule //Gör det möjligt att använda RouterModule i andra router moduler genom att exportera den.
  ],
  imports: [
    RouterModule.forRoot(routes) //root routes
  ],
})
export class AppRoutingModule {

}
