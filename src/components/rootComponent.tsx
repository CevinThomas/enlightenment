import React from 'react';
import {AuthStackNavigator, BaseNavigator} from "../stackNavigators";
import {useNavigation} from "../contexts/navigationContext";

const RootComponent = () => {

    const navigation = useNavigation();

    return (
        <>
            {navigation === true ? <BaseNavigator/> : <AuthStackNavigator/>}
        </>
    );
};

export default RootComponent;
