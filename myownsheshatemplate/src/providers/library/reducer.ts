import { LibraryActions } from './actions';
import { IStateContext } from './context';

export function libraryReducer(state: IStateContext, action: ReduxActions.Action<IStateContext>) {
  const { type, payload } = action;
  
  switch (type) {
    case LibraryActions.CREATE_LIBRARY:
    case LibraryActions.FETCH_LIBRARY:
    case LibraryActions.FETCH_LIBRARY_LIST:
    case LibraryActions.TOGGLE_DISPLAY_MODE:

        return {
            ...state,
            ...payload,
          };
    
        default:
          return state;
      }
}
