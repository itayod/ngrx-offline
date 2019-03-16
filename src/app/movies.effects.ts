import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {switchMap, catchError, map} from 'rxjs/operators';
import * as moviesActions from './actions/movies.actions';

@Injectable()
export class MoviesEffects {

  constructor(private actions$: Actions, private http: HttpClient) {}

  @Effect()
  loadMovies = this.actions$.pipe(
    ofType(moviesActions.MoviesActionTypes.LoadMovies),
    switchMap(() => this.http.get('/api/movies')
      .pipe(
        catchError(err => of(new moviesActions.LoadMoviesFailure({error: err}))),
        map((res: any) => new moviesActions.LoadMoviesSuccess({data: res}))
      )
    )
  );


}
