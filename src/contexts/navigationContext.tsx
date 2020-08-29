import React, {createContext, useContext, useState} from "react";

const NavigationContext = createContext(undefined);
const UpdateNavigationContext = createContext(undefined);

export function useNavigation() {
    return useContext(NavigationContext);
}

export function useNavigationUpdate() {
    return useContext(UpdateNavigationContext);
}

export function NavigationProvider({children}) {
    const [navigationState, setNavigationState] = useState(false);

    function toggleNavigation() {
        setNavigationState(prevState => !prevState);
    }

    return (
        <NavigationContext.Provider value={navigationState}>
            <UpdateNavigationContext.Provider value={toggleNavigation}>
                {children}
            </UpdateNavigationContext.Provider>
        </NavigationContext.Provider>
    );

}
