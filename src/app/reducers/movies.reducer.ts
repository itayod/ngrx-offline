import {createSelector} from '@ngrx/store';
import {MoviesActionTypes, MoviesActions} from '../actions/movies.actions';
import {IMovies} from '../app.models';


export interface MoviesState {
  movies: IMovies[];
}

export const initialState: MoviesState = {
  movies: []
};


export const movies = (state => state.movies);
export const selectMovies = createSelector(movies, (state: MoviesState) => state.movies);

export function reducer(state = initialState, action: MoviesActions): MoviesState {
  switch (action.type) {
    case MoviesActionTypes.LoadMoviesSuccess:
      return {...state, movies: action.payload.data};
    default:
      return state;
  }
}
