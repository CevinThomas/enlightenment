import React from 'react';


const State = React.createContext({navigation: 0});
// @ts-ignore
const StateDispatchContext = React.createContext(undefined);

const ContextProvider = (props) => {

    const [state, dispatch] = React.useState({navigation: 0});

    return (
        <State.Provider value={state}>
            <StateDispatchContext.Provider value={dispatch}>
                {props.children}
            </StateDispatchContext.Provider>
        </State.Provider>
    );
};

const UseStateContext = () => {
    const context = React.useContext(State);
    return context;
};

function UseDispatchContext() {
    const context = React.useContext(StateDispatchContext);
    return context;
}

export {ContextProvider, UseStateContext, UseDispatchContext, State};
