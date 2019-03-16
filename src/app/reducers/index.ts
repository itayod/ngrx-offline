import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as movies from './movies.reducer';
import * as root from './root.reducer';

export interface State {
  root: root.RootState;
  movies: movies.MoviesState
}

export const reducers: ActionReducerMap<State> = {
  root: root.reducer,
  movies: movies.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
