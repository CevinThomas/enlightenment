import React, {useEffect, useState} from "react";
import {Animated} from "react-native";

const FadeIn = props => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000
            }
        ).start();
    }, []);

    return (
        <Animated.View style={{opacity: fadeAnim}}>{props.children}</Animated.View>
    );
};

export default FadeIn;
