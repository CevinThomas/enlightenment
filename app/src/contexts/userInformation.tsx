import React, { createContext, useContext, useReducer } from "react";

const StateContext = createContext(undefined);
const UpdateStateContext = createContext(undefined);

export function useGlobalUserInformationState() {
  return useContext(StateContext);
}

export function useGlobalUserInformationStateUpdate() {
  return useContext(UpdateStateContext);
}

function reducer(state, action) {
  switch (action.type) {
    case "LICENCEID":
      return {
        licenceId: action.payload,
      };
  }
}

export function UserInformationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { licenceId: null });

  function updateUserLicenceId(payload) {
    dispatch(payload);
  }

  return (
    <StateContext.Provider value={state}>
      <UpdateStateContext.Provider value={updateUserLicenceId}>
        {children}
      </UpdateStateContext.Provider>
    </StateContext.Provider>
  );
}
