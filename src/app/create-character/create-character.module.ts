import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CreateCharacterComponent } from "./create-character.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    CreateCharacterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([ //child routes
      {path:'', component: CreateCharacterComponent}
    ]) //Låter oss definiera routes för en module som inte är den valda app modulen
  ]
})
export class CreateCharacterModule{

 }
