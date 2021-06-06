import { createAction } from "redux-actions";
import { ILibrarian, IStateContext } from "./context";

export enum LibrarianActions {
  CREATE_LIBRARIAN = "CREATE_LIBRARIAN",
  FETCH_LIBRARIAN_LIST = "FETCH_LIBRARIAN_LIST",
  FETCH_LIBRARIAN = "FETCH_LIBRARIAN",
  TOGGLE_DISPLAY_MODE = "TOGGLE_DISPLAY_MODE",
  STORE_ID = 'STORE_ID',
  //DELETE_LIBRARIAN = "DELETE_LIBRARIAN"
}

export const createLibrarianAction = createAction<IStateContext>(
  LibrarianActions.CREATE_LIBRARIAN,
  () => ({})
);

export const fetchLibrarianListAction = createAction<
  IStateContext,
  ILibrarian[]
>(LibrarianActions.FETCH_LIBRARIAN_LIST, (librarianList) => ({
  librarianList,
}));

export const fetchLibrarianAction = createAction<IStateContext, ILibrarian>(
  LibrarianActions.FETCH_LIBRARIAN,
  (librarian) => ({ librarian })
);

export const toggleDisplayModeAction = createAction<IStateContext, boolean>(
  LibrarianActions.TOGGLE_DISPLAY_MODE,
  (displayMode) => ({ displayMode })
);


export const storeLibrarianIdAction = createAction<IStateContext,string>(
  LibrarianActions.STORE_ID,
  (librarianId) => ({librarianId})
)

/*export const deleteLibrarianAction = createAction<IStateContext, string>(
  LibrarianActions.DELETE_LIBRARIAN,
  (librarianId) => ({ librarianId })
);*/