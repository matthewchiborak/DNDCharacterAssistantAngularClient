import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; 

import { AppComponent } from './app.component';
import { CharacterlistComponent } from './components/characterlist/characterlist.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { ButtonComponent } from './components/button/button.component';
import { CounterBoxComponent } from './components/counter-box/counter-box.component';
import { CharacterCreatorComponent } from './components/character-creator/character-creator.component';
import { CharacterUpdaterComponent } from './components/character-updater/character-updater.component';
import { LoginComponent } from './components/login/login.component';

import { ErrorInterceptor } from './helpers/error.interceptors';
import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { AuthGuard } from './helpers/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { CharacterFormComponent } from './components/character-form/character-form.component';

const appRoutes: Routes  = [
	{path: '', component: CharacterlistComponent, canActivate: [AuthGuard] },
	{path: 'charactersheet/:id', component: CharacterSheetComponent, canActivate: [AuthGuard]},
	{path: 'charactercreator', component: CharacterCreatorComponent, canActivate: [AuthGuard]},
	{path: 'characterupdater/:id', component: CharacterUpdaterComponent, canActivate: [AuthGuard]},
	{path: 'login', component: LoginComponent},
	{path: 'logout', component: LogoutComponent},
	{path: '**', redirectTo: ''}
]

@NgModule({
  declarations: [
    AppComponent,
    CharacterlistComponent,
    CharacterSheetComponent,
    ButtonComponent,
    CounterBoxComponent,
    CharacterCreatorComponent,
    CharacterUpdaterComponent,
    LoginComponent,
    LogoutComponent,
    CharacterFormComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
	ReactiveFormsModule,
	RouterModule.forRoot(appRoutes, { enableTracing: true})
  ],
  providers: [
	{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
	{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
