import { Actions as CoreActions } from '../actions/core';
import { ICoreState } from '../reducers/core';

declare global {
  namespace Athleticus {
    export type RootAction = CoreActions;

    export type IApplicationState {
      core: ICoreState;
    }
  }
}
