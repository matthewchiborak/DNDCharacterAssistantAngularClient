import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; 

import { AppComponent } from './app.component';
import { CharacterlistComponent } from './components/characterlist/characterlist.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';

const appRoutes: Routes  = [
	{path: '', component: CharacterlistComponent},
	{path: 'charactersheet/:id', component: CharacterSheetComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    CharacterlistComponent,
    CharacterSheetComponent
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
