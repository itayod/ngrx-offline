import {createSelector} from '@ngrx/store';
import {RootActions, RootActionTypes} from '../actions/root.actions';


export interface RootState {
  online: boolean;
}

export const initialState: RootState = {
  online: navigator.onLine
};

export const root = (state => state.root);
export const selectIsOnline = createSelector(root, (state: RootState) => state.online);

export function reducer(state = initialState, action: RootActions): RootState {
  switch (action.type) {
    case RootActionTypes.OnlineChanged:
      return {...state, online: action.payload};
    default:
      return state;
  }
}
