import { Component } from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectData} from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngrx-offline';
  private date$: Observable<any>;

  constructor(private store: Store<any>) {
    this.date$ = store.pipe(select(selectData));
    this.store.dispatch({type: 'UPDATE_DATE', payload: {bla: 'bla'}});
  }
}
