import { Action } from '@ngrx/store';
import {IMovie} from '../app.models';

export enum MoviesActionTypes {
  LoadMovies = '[Movies] Load Movies',
  LoadMoviesSuccess = '[Movies] Load Movies Success',
  LoadMoviesFailure = '[Movies] Load Movies Failure',
  AddToFavorites = '[Movies] Add To Favorites',
  RemoveFromFavorites = '[Movies] Remove From Favorites'
}

export class LoadMovies implements Action {
  readonly type = MoviesActionTypes.LoadMovies;
}

export class LoadMoviesSuccess implements Action {
  readonly type = MoviesActionTypes.LoadMoviesSuccess;
  constructor(public payload: { data: any }) { }
}

export class LoadMoviesFailure implements Action {
  readonly type = MoviesActionTypes.LoadMoviesFailure;
  constructor(public payload: { error: any }) { }
}

export class AddToFavorites implements Action {
  readonly type = MoviesActionTypes.AddToFavorites;
  constructor(public payload: IMovie['id']) { }
}

export class RemoveFromFavorites implements Action {
  readonly type = MoviesActionTypes.RemoveFromFavorites;
  constructor(public payload: IMovie['id']) { }
}
export type MoviesActions = LoadMovies | LoadMoviesSuccess | LoadMoviesFailure | AddToFavorites | RemoveFromFavorites;

