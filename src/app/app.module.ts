import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {EffectService} from './effect.service';
import { reducers, metaReducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([EffectService])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
