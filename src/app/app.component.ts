import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {fromEvent, merge, Observable} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {LoadMovies, AddToFavorites, RemoveFromFavorites} from './actions/movies.actions';
import {OnlineChanged} from './actions/root.actions';
import {IMovie} from './app.models';
import {selectMovies, movies} from './reducers/movies.reducer';
import {selectIsOnline} from './reducers/root.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ngrx-offline';
  public isOnline$: Observable<boolean>;
  private movies$: Observable<IMovie[]>;
  private favorites$: Observable<IMovie[]>;

  constructor(private store: Store<any>, http: HttpClient) {
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
  addToFavorites(id) {
    this.store.dispatch(new AddToFavorites(id));
  }

  removeFromFavorites(id) {
    this.store.dispatch(new RemoveFromFavorites(id));
  }
}
