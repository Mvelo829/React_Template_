import {createContext} from 'react';
//import { ILibrarian } from '../librarian/context';

//Define or declare interfaces.....
export interface ILibrary{
    id: string;
    shelve: string;
    //librarian : ILibrarian;
    book: string;
    timeOpen: Date;
    isPopular: boolean;
}
export enum DisplayMode{
    submit=1,
    display=2,
    displayLIST=3,
}
export interface IStateContext{
    library?: ILibrary;
    libraryId?: string;
    libraryList?: ILibrary[];
    displayMode?: number;
    isInProgress?: any;
    error?: any;
}

export interface IActionContext{
    createLibrary:(library: ILibrary) => void;
    fetchLibrary:(libraryId: string) => void;
    fetchLibraryList:() =>void;
    toggleDisplayMode:(mode: number) => void;
    deleteLibrary: (deletion_libraryId: string) => void;
    editLibrary: (newLibraries: ILibrary) => void;
}

//Initial state
export const LIBRARY_CONTEXT_INITIAL_STATE : IStateContext = {
    displayMode:1,
};


//CreateContext for the state and the actions
export const LibraryStateContext = createContext <IStateContext>(LIBRARY_CONTEXT_INITIAL_STATE);
export const LibraryActionContext = createContext<IActionContext>(undefined as any);
