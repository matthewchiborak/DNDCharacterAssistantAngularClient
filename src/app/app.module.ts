import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; 

import { AppComponent } from './app.component';
import { CharacterlistComponent } from './components/characterlist/characterlist.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { ButtonComponent } from './components/button/button.component';
import { CounterBoxComponent } from './components/counter-box/counter-box.component';
import { CharacterCreatorComponent } from './components/character-creator/character-creator.component';

const appRoutes: Routes  = [
	{path: '', component: CharacterlistComponent},
	{path: 'charactersheet/:id', component: CharacterSheetComponent},
	{path: 'charactercreator', component: CharacterCreatorComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CharacterlistComponent,
    CharacterSheetComponent,
    ButtonComponent,
    CounterBoxComponent,
    CharacterCreatorComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	RouterModule.forRoot(appRoutes, { enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
