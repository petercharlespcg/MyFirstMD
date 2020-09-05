import { FormsComponent } from './../components/forms/forms.component';
import { CardsComponent } from './../components/cards/cards.component';
import { ButtonsComponent } from './../components/buttons/buttons.component';
import { HomeComponent } from './../components/home/home.component';
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'buttons', component: ButtonsComponent},
  { path: 'cards', component: CardsComponent},
  { path: 'forms', component: FormsComponent},
]

@NgModule({
  declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
