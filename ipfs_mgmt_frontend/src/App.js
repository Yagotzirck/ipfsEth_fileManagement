import "./hooks/useDAppState";

import InitDApp from "./InitDApp";
import DApp from "./DApp";
import useDAppState from "./hooks/useDAppState";

function App() {
  const [state, setState, resetState] = useDAppState();

  return (
    <>
    <h1>IPFS File Management</h1>
    {
      state.errorMsg?
        <p className="error">{state.errorMsg}</p>
      :
        !state.userAddress?
          <InitDApp setState={setState} resetState={resetState} />
        :
          !state.isAuthorized?
            <p className="error">
              Your Ethereum address hasn't been authorized by the Smart Contract owner.
            </p>
          :
            <DApp state={state} />
    }
    </>
  );
}

export default App;