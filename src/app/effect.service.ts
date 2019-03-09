import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable, Inject} from '@angular/core';
import {Effect, Actions, ofType, ROOT_EFFECTS_INIT} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {of, fromEvent, Observable} from 'rxjs';
import {concatMap, map, catchError, switchMap, mapTo, tap, flatMap} from 'rxjs/operators';

export interface StoredAction {
  id: number;
  action: ApiAction;
}
export type ActionClass = { new(res: any): Action; };
export interface ApiAction extends Action {
  payload: {request: HttpRequest<any>, SuccessAction: ActionClass, FailureAction: ActionClass};
}

@Injectable({
  providedIn: 'root'
})
export class EffectService {

  get isOnline() {
    return navigator.onLine;
  }

  constructor(@Inject('API_ACTIONS') private apiActions: string[],
              @Inject('LOCAL_STORAGE_KEY') private LOCAL_STORAGE_KEY: string,
              private actions$: Actions,
              private http: HttpClient) {
  }

  @Effect()
  init$ = this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      flatMap(() => this.getActions()),
      concatMap((storedAction: StoredAction) =>
          this.disposeAction(storedAction.id, storedAction.action)
      )
  );

  @Effect()
  handleRequest = this.actions$.pipe(
      ofType<ApiAction>(...this.apiActions),
      concatMap(action => this.isOnline ?
          this.executeRequest(action) :
          this.suspendRequest(action))
  );

  executeRequest(action: ApiAction): Observable<Action> {
    return this.http.request(action.payload.request).pipe(
        map(res => new action.payload.SuccessAction(res)),
        catchError(err => of(new action.payload.FailureAction(err)))
    );
  }

  suspendRequest(apiAction: ApiAction): Observable<Action> {
    const actionQueueId = this.saveAction(apiAction);
    return of(apiAction).pipe(
        concatMap(action => fromEvent(window, 'online').pipe(mapTo(action))),
        switchMap(action => this.disposeAction(actionQueueId, action)),
    );
  }

  disposeAction(actionQueueId: StoredAction['id'], apiAction: ApiAction): Observable<Action> {
    return this.executeRequest(apiAction).pipe(
        tap(() => this.removeAction(actionQueueId))
    );
  }

  private saveAction(action: ApiAction): StoredAction['id'] {
    const id      = new Date().getTime();
    const actions = this.getActions();
    actions.push({id, action});
    this.setActions(actions);

    return id;
  }

  private removeAction(actionId: StoredAction['id']): void {
    const savedActions = this.getActions();
    const actions      = savedActions.filter(a => a.id !== actionId);
    this.setActions(actions);
  }

  private getActions(): StoredAction[] {
    return JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY) || '[]');
  }

  private setActions(actions: StoredAction[]): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(actions));
  }

}
