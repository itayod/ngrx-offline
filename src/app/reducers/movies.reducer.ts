import {createSelector} from '@ngrx/store';
import {MoviesActionTypes, MoviesActions} from '../actions/movies.actions';
import {IMovie} from '../app.models';


export interface MoviesState {
  movies: IMovie[];
  favorites: IMovie['id'][];
}

export const initialState: MoviesState = {
  movies: [],
  favorites: []
};


export const movies = (state => state.movies);
export const selectMovies = createSelector(movies, (state: MoviesState) => state.movies);

export function reducer(state = initialState, action: MoviesActions): MoviesState {
  switch (action.type) {
    case MoviesActionTypes.LoadMoviesSuccess:
      return {...state, movies: action.payload.data};
    case MoviesActionTypes.AddToFavorites:
      return {...state, favorites: state.favorites.concat(action.payload)}
    case MoviesActionTypes.RemoveFromFavorites:
      return {...state, favorites: state.favorites.filter((movieId) => action.payload !== movieId)}
    default:
      return state;
  }
}
