import React, { useReducer, useEffect, useState, FC, PropsWithChildren, useContext } from 'react';
import { useGet, useMutate } from 'restful-react';
import {
  createLibrarianAction,
  fetchLibrarianAction,
  fetchLibrarianListAction,
  toggleDisplayModeAction,
  storeLibrarianIdAction,
  
} from './actions';
import { ILibrarian, LibrarianActionContext, LibrarianStateContext, LIBRARIAN_CONTEXT_INITIAL_STATE } from './context';
import { librarianReducer } from './reducer';

const LibrarianProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [state, dispatch] = useReducer(librarianReducer, LIBRARIAN_CONTEXT_INITIAL_STATE);

  //#region createLibrarian
  const {
    mutate: createLibrarianHttp,
    loading: isCreating,
    error: errorCreating,
  } = useMutate({
    verb: 'POST',
    path: '/api/Librarians',
  });

  const createLibrarian = (librarianInput: ILibrarian) => {
    dispatch(createLibrarianAction());

    createLibrarianHttp(librarianInput)
      .then((res) => {
         console.log('res :>> ', res);
         storeLibrarianId(res?.id)
       //fetchLibrarian(res?.id); 
        toggleDisplayMode(true);
      })
      .catch((err) => {
        console.log('err :>> ', err);
      });
  };
  //#endregion

  //#region fetchLibrarianList
  const {
    refetch,
    data,
    loading: isFetchingList,
    error: errorFetching,
  } = useGet({
    path: '/api/Librarians',
    lazy: true,
  });

  useEffect(() => {
    if (!isFetchingList && data) dispatch(fetchLibrarianListAction(data?.result));
  }, [data, isFetchingList]);

  const fetchLibrariansList = () => {
    refetch();
  };
  //#endregion

  //#region fetchLibrarian
  const [id, setId] = useState('');
  const {
    refetch: fetchLibrarianHttp,
    data: librarianData,
    loading: isFetchingLibrarian,
    error: errorFetchingLibrarian,
  } = useGet({
    path: `/api/Librarians/${id}`,
    lazy: true,
  });

  useEffect(() => {
    if (id) fetchLibrarianHttp();
  }, [fetchLibrarianHttp, id]);

  useEffect(() => {
    if (!isFetchingLibrarian && librarianData) {
      console.log('librarianData :>> ', librarianData);
      dispatch(fetchLibrarianAction(librarianData));
    }
  }, [isFetchingLibrarian, librarianData]);

  const fetchLibrarian = (librarianId: string) => {
    setId(librarianId);
  };
  //#endregion

  const toggleDisplayMode = (mode: boolean) => {
    dispatch(toggleDisplayModeAction(mode));
  };

  const storeLibrarianId = (librarianId: string) =>{
    dispatch(storeLibrarianIdAction(librarianId))
  }

  

  return (
    <LibrarianStateContext.Provider
      value={{
        ...state,
        isInProgress: { isCreating, isFetchingList, isFetchingLibrarian },
        error: { errorCreating, errorFetching, errorFetchingLibrarian },
      }}
    >
      <LibrarianActionContext.Provider
        value={{
          createLibrarian,
          fetchLibrariansList,
          fetchLibrarian,
          toggleDisplayMode,
          storeLibrarianId,
        }}
      >
        {children}
      </LibrarianActionContext.Provider>
    </LibrarianStateContext.Provider>
  );
};

const useStateContext = () => {
  const context = useContext(LibrarianStateContext);

  if (context === undefined) {
    throw new Error("'useLibrarianState must be used within a LibrarianProvider'");
  }

  return context;
};

const useActionsContext = () => {
  const context = useContext(LibrarianActionContext);

  if (context === undefined) {
    throw new Error('useLibrarianActions must be used within a LibrarianProvider');
  }

  return context;
};

const useLibrarians = () => {
  return { ...useStateContext(), ...useActionsContext() };
};

export { useLibrarians, LibrarianProvider };
