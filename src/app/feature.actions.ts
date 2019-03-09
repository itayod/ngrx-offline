import { Action } from '@ngrx/store';

export enum FeatureActionTypes {
  LoadFeatures = '[Feature] Load Features',
  LoadFeaturesSuccess = '[Feature] Load Features Success',
  LoadFeaturesFailure = '[Feature] Load Features Failure',
}

export class LoadFeatures implements Action {
  readonly type = FeatureActionTypes.LoadFeatures;
}

export class LoadFeaturesSuccess implements Action {
  readonly type = FeatureActionTypes.LoadFeaturesSuccess;
  constructor(public payload: { data: any }) { }
}

export class LoadFeaturesFailure implements Action {
  readonly type = FeatureActionTypes.LoadFeaturesFailure;
  constructor(public payload: { error: any }) { }
}

export type FeatureActions = LoadFeatures | LoadFeaturesSuccess | LoadFeaturesFailure;

