import { useState } from "react";

function useDAppState() {
  const initialState = {
    userAddress:  undefined,
    contract:     undefined,
    isAuthorized: undefined,
    isAdmin:      undefined,
  };

  const [DAppState, setDAppState] = useState(initialState);

  function setState(newValues){
    for(const [key, value] of Object.entries(newValues)){
        DAppState[key] = value;
    }
    setDAppState( {...DAppState} );
  }

  function resetState(){ setState( initialState ); }

  return [DAppState, setState, resetState];
}

export default useDAppState;