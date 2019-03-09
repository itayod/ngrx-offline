import {HttpRequest} from '@angular/common/http';
import { Action } from '@ngrx/store';
import {ActionClass, ApiAction} from './effect.service';

export enum ActionActionTypes {
  LoadActions = '[Action] Load Actions',
  LoadActionsSuccess = '[Action] Load Actions Success',
  LoadActionsFailure = '[Action] Load Actions Failure',
}

export class LoadActions implements ApiAction {
  readonly type = ActionActionTypes.LoadActions;
  public payload: {request: HttpRequest<any>, SuccessAction: ActionClass, FailureAction: ActionClass};

  constructor(request: HttpRequest<any>) {
    this.payload = {request, SuccessAction: LoadActionsSuccess, FailureAction: LoadActionsFailure};
  }
}

export class LoadActionsSuccess implements Action {
  readonly type = ActionActionTypes.LoadActionsSuccess;
  constructor(public payload: { data: any }) { }
}

export class LoadActionsFailure implements Action {
  readonly type = ActionActionTypes.LoadActionsFailure;
  constructor(public payload: { error: any }) { }
}

export type ActionActions = LoadActions | LoadActionsSuccess | LoadActionsFailure;

