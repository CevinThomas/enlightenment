import React from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import ButtonList from "./buttonList";

const Home = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Text style={styles.mainHeading}>Welcome future Beast!</Text>
            <View style={styles.secondaryContainer}>
                <Text style={styles.secondaryText}>This is place for you to be the fucking ultimate beast and advance
                    your
                    skills in the shit that is
                    required. Please, pick a category.</Text>
            </View>

            <View style={styles.buttonContainer}>
                <FlatList keyExtractor={(item, index) => index.toString()}
                          data={["SEO", "Javascript", "Python"]}
                          renderItem={({item}) => <ButtonList key={item} navigation={navigation}
                                                              boxTitle={item}/>}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    secondaryContainer: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        marginTop: 20,
        shadowOffset: {width: 0, height: 0},
        shadowColor: "#000",
        elevation: 100,
        shadowRadius: 5,
        shadowOpacity: 0.1
    },
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        paddingTop: 30,
    },
    secondaryText: {
        color: "green",
        fontSize: 14,
        lineHeight: 25
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },

    mainHeading: {
        fontSize: 25,
        color: "green"
    }
});

export default Home;
