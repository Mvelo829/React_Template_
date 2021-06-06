import { LibrarianActions } from './actions';
import { IStateContext } from './context';

export function librarianReducer(state: IStateContext, action: ReduxActions.Action<IStateContext>) {
  const { type, payload } = action;

  switch (type) {
    case LibrarianActions.CREATE_LIBRARIAN:
    case LibrarianActions.FETCH_LIBRARIAN:
    case LibrarianActions.FETCH_LIBRARIAN_LIST:
    case LibrarianActions.TOGGLE_DISPLAY_MODE:
    case LibrarianActions.STORE_ID:
      /*const {librarianId}=payload;
      return {
        ...state,
        librarianList:state.librarianList?.filter()
    }*/
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}
