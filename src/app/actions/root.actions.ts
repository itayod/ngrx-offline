import { Action } from '@ngrx/store';

export enum RootActionTypes {
  OnlineChanged = '[Root] Online Changed',
}

export class OnlineChanged implements Action {
  readonly type = RootActionTypes.OnlineChanged;

  constructor(public payload: boolean) {}
}

export type RootActions = OnlineChanged;
