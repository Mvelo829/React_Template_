import {createAction} from "redux-actions";
import {IStateContext, ILibrary} from "./context";


export enum LibraryActions{
    CREATE_LIBRARY = "CREATE_LIBRARY",
    FETCH_LIBRARY = "FETCH_LIBRARY",
    FETCH_LIBRARY_LIST = "FETCH_LIBRARY_LIST",
    TOGGLE_DISPLAY_MODE = "TOGGLE_DISPLAY_MODE",
}

//Define actions using createActions, this eradicate the use of type and payload....

export const createLibraryAction = createAction<IStateContext>(
   LibraryActions.CREATE_LIBRARY,   // type:"CREATE_LIBRARY"
   ()=>({})                         // payload:null
)


export const fetchLibraryAction = createAction<IStateContext, ILibrary>(
  LibraryActions.FETCH_LIBRARY, // type:"FETCH_LIBRARY"
  (library)=>({library})        // payload:library
)

export const fetchLibraryListAction = createAction<IStateContext, ILibrary[]>(
   LibraryActions.FETCH_LIBRARY_LIST,
   (libraryList) => ({libraryList}) 
)


export const toggleDisplayModeAction = createAction<IStateContext, number>(
    LibraryActions.TOGGLE_DISPLAY_MODE,
    (displayMode) => ({ displayMode })
)

