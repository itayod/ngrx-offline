import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

export interface State {
  data: any
}

export const reducers: ActionReducerMap<State> = {
  data: reducer
};

function reducer(state: State, action): State {
  switch (action.type) {
    case 'UPDATE_DATE':
      return {...state, data: action.payload};
    default:
      return state;
  }
}

export const selectState = createSelector((state) => state);
export const selectData = createSelector(selectState, (state: State) => state.data);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
