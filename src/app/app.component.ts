import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {fromEvent, merge, Observable} from 'rxjs';
import {mapTo} from 'rxjs/operators';
import {LoadFavorites, AddToFavorites} from './actions/favorites.actions';
import {LoadMovies} from './actions/movies.actions';
import {OnlineChanged} from './actions/root.actions';
import {IMovie} from './app.models';
import {selectFavorites} from './reducers/favoites.reducer';
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


    this.movies$.subscribe((movieList: IMovie[]) => {
      // @ts-ignore
      this.store.dispatch(new LoadFavorites(movieList));

      // this.store.dispatch(new AddToFavorites(movieList[0]))
    })

    this.favorites$ = this.store.select(selectFavorites);
  }
}
