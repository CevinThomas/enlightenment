import React, {createContext, useContext, useReducer} from "react";

const StateContext = createContext(undefined);
const UpdateStateContext = createContext(undefined);

export function useGlobalState() {
    return useContext(StateContext);
}

export function useGlobalStateUpdate() {
    return useContext(UpdateStateContext);
}

function reducer(state, action) {
    switch (action.type) {
        case "CHANGE_NAV":
            return {
                navigation: !state.navigation
            };
    }
}

export function NavigationProvider({children}) {
    const [state, dispatch] = useReducer(reducer, {navigation: false});

    function toggleNavigation(payload) {
        dispatch(payload);
    }

    return (
        <StateContext.Provider value={state}>
            <UpdateStateContext.Provider value={toggleNavigation}>
                {children}
            </UpdateStateContext.Provider>
        </StateContext.Provider>
    );

}
