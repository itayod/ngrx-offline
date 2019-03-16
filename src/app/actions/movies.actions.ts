import { Action } from '@ngrx/store';

export enum MoviesActionTypes {
  LoadMovies = '[Movies] Load Movies',
  LoadMoviesSuccess = '[Movies] Load Movies Success',
  LoadMoviesFailure = '[Movies] Load Movies Failure',
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

export type MoviesActions = LoadMovies | LoadMoviesSuccess | LoadMoviesFailure;

