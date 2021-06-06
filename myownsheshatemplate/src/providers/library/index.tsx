import React, { useReducer, useEffect, useState, FC, PropsWithChildren, useContext } from 'react';
import { useGet, useMutate } from 'restful-react';
import {createLibraryAction, 
   fetchLibraryAction, 
   fetchLibraryListAction,
   toggleDisplayModeAction,
} from './actions';
import {ILibrary, 
   LIBRARY_CONTEXT_INITIAL_STATE,
   LibraryStateContext,
   LibraryActionContext, 
   DisplayMode} from './context';
import {libraryReducer} from './reducer';

const LibraryProvider : FC<PropsWithChildren<any>> = ({children}) => {
    const [state, dispatch] = useReducer(libraryReducer, LIBRARY_CONTEXT_INITIAL_STATE);

    //Create Library
    const{
        mutate: createLibraryHttp,
        loading: isCreatingLibrary,
        error: errorCreating,
    } = useMutate ({
        verb: 'POST',
        path: '/api/Libraries',
    })

    

    // Fetch LibraryList

    const{
        refetch,
        data,
        loading: isFetchingList,
        error: errorFetching,
    } = useGet({
        path: '/api/Libraries',
        lazy: true,
    });

    useEffect(() => {
        if (!isFetchingList && data){
          dispatch(toggleDisplayModeAction(DisplayMode.displayLIST))
          dispatch(fetchLibraryListAction(data));
        } 
      }, [data, isFetchingList]);
    
      const fetchLibraryList = () => {
        refetch();
      };

      //Fetch Library
      const [id, setId] = useState('');
      const {
        refetch: fetchLibraryHttp,
        data: libraryData,
        loading: isFetchingLibrary,
        error: errorFetchingLibrary,
      } = useGet({
        path: `/api/Libraries/${id}`,
        lazy: true,
          
      });

      useEffect(() => {
        if (id) fetchLibraryHttp();
      }, [fetchLibraryHttp, id]);
    
      useEffect(() => {
        if (!isFetchingLibrary && libraryData) {
          console.log('libraryData :>> ', libraryData);
          dispatch(fetchLibraryAction(libraryData));
        }
      }, [isFetchingLibrary, libraryData]);
    
      //Use the createLibrary
     const createLibrary = (libraryInput: ILibrary)=>{
        dispatch(createLibraryAction());

        createLibraryHttp(libraryInput)
        .then((respond) => {
         console.log('respond :>> ', respond);
         fetchLibrary(respond?.id); 
         toggleDisplayMode(DisplayMode.display);
        })
        .catch((err) => {
          console.log('error :>> ', err);
        });

    }

    //delete library
    const { mutate: deleteLibraryHttp, error: errorDeleting, loading: isDeleting } = useMutate({
      verb: 'DELETE',
      path: '/api/Libraries'
  })  


    const deleteLibrary = (deletetion_libraryId : string) => {

      deleteLibraryHttp(deletetion_libraryId).then((res) => {
       alert("Deleting " + res.book + "\n" + res.shelve+ "\n" + res.timeOpen + "\n" + res.isPopular);
        refetch();              // ??????????
      }).catch((err) => {
        console.log('err :>> ', err);
      });
    }
  

    //Edit the library

    const { mutate: updateLibraryHttp, error: errorUpdate, loading: isUpdate } = useMutate({
      verb: 'PUT',
      path:`/api/Libraries/${id}`
    })

    const editLibrary = (newLibrary: ILibrary) => {

      console.log(newLibrary);
      updateLibraryHttp(newLibrary).then((res) => {
        alert("Updating with " + res.book + "\n" + res.shelve+ "\n" + res.timeOpen + "\n" + res.isPopular);
        refetch();            // ??????????
      }).catch((err) => {
        alert("oppps!!!")
        console.log('err :>> ', err);
      });
  
    }


      //Use the fetchLibrary
      const fetchLibrary = (libraryId: string) => {
        setId(libraryId);
      };

     
     const toggleDisplayMode = (mode: number) => {
      dispatch(toggleDisplayModeAction(mode));
    };
    

  return(
      <LibraryStateContext.Provider
       value={{
          ...state,
           isInProgress:{isCreatingLibrary, isFetchingList, isFetchingLibrary, isDeleting,isUpdate},
           error: {errorCreating, errorFetching ,errorFetchingLibrary, errorDeleting, errorUpdate}}}>
          <LibraryActionContext.Provider
          value={
             { createLibrary,
              fetchLibrary,
              fetchLibraryList,
              toggleDisplayMode,
              deleteLibrary,
              editLibrary,}
               }>
              {children}
          </LibraryActionContext.Provider>
    </LibraryStateContext.Provider>

  );
};

const useStateContext = () => {
    const context = useContext(LibraryStateContext);
  
    if (context === undefined) {
      throw new Error("'useLibraryState must be used within a LibraryProvider'");
    }
  
    return context;
  };
  
  const useActionsContext = () => {
    const context = useContext(LibraryActionContext);
  
    if (context === undefined) {
      throw new Error('useLibraryActions must be used within a LibraryProvider');
    }
  
    return context;
  };

const useLibrary= () => {
    return {...useStateContext(), ...useActionsContext()};
}
export {LibraryProvider, useLibrary};