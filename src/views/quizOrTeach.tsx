import React from 'react';
import {TouchableOpacity, View} from "react-native";

const QuizOrTeach = () => {
    return (
        <View>
            <TouchableOpacity>
                <Text>Quiz me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Teach me</Text>
            </TouchableOpacity>
        </View>
    );
};

export default QuizOrTeach;
