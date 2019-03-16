import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {fromEvent, merge, Observable} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {LoadMovies} from './actions/movies.actions';
import {OnlineChanged} from './actions/root.actions';
import {IMovies} from './app.models';
import {selectMovies} from './reducers/movies.reducer';
import {selectIsOnline} from './reducers/root.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ngrx-offline';
  public isOnline$: Observable<boolean>;
  private movies$: Observable<IMovies[]>;

  constructor(private store: Store<any>) {
    merge(
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false)),
    ).subscribe((isOnline) => {
      this.store.dispatch(new OnlineChanged(isOnline));
    });

    this.isOnline$ = this.store.select(selectIsOnline);

    this.store.dispatch(new LoadMovies());
    this.movies$ = this.store.select(selectMovies);
  }
}
