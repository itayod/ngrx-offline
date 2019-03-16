import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {MoviesEffects} from './movies.effects';
import {reducers, metaReducers} from './reducers';
import { MovieComponent } from './movie/movie.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([MoviesEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [MoviesEffects],
  bootstrap: [AppComponent]
})
export class AppModule { }
