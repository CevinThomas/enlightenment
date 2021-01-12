import { Text } from "@ui-kitten/components";
import React from "react";
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const QuestionOverlay = ({ groupData, navigateToQuestionsFunction }) => {
  return (
    <Modal animationType={"slide"}>
      <View style={[styles.container]}>
        <View>
          <Image
            style={{
              width: "100%",
              height: heightPercentageToDP("50%"),
              resizeMode: "cover",
              overflow: "visible",
            }}
            source={require("../../assets/images/bow-lake-5854210_1920.jpg")}
          />
        </View>
        <View style={[styles.infoOverlay]}>
          <View style={{ padding: 20 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={[styles.InfoText, { fontWeight: "bold", fontSize: 22 }]}
              >
                Javascript Syntax
              </Text>
              <Text style={[styles.InfoText]}>Icon</Text>
            </View>

            <View
              style={{
                paddingTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.InfoText}>Subject</Text>
              <Text style={[styles.InfoText]}>Intermediate</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: heightPercentageToDP("4%"),
            width: widthPercentageToDP("85%"),
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View
            style={{
              width: "100%",
            }}
          >
            <View>
              <View
                style={{
                  paddingTop: 10,
                  position: "relative",
                }}
              >
                <View style={{ width: "100%" }}>
                  <Image
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      borderRadius: 25,
                      width: widthPercentageToDP("12%"),
                      height: heightPercentageToDP("6%"),
                    }}
                    source={require("../../assets/images/girl-919048_1920.jpg")}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "100%",
                      paddingLeft: "18%",
                      paddingTop: 5,
                    }}
                  >
                    <Text style={styles.InfoText}>Maya Berkovskaya</Text>
                    <Text style={styles.InfoText}>May 25, 2019</Text>
                  </View>
                  <View style={{ paddingLeft: "18%", paddingTop: 10 }}>
                    <Text style={styles.InfoText}>Owner</Text>
                  </View>
                  <View style={{ paddingTop: 20 }}>
                    <Text style={styles.greyText}>
                      This quiz will help you understand the new syntax in
                      Javascript and hopefully make you more familiar with the
                      language structure.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.questionsContainer}>
          <TouchableOpacity
            onPress={navigateToQuestionsFunction}
            style={styles.textButton}
          >
            <Text style={styles.text}>Quiz Me!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textButton}>
            <Text style={styles.text}>Teach Me!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  infoOverlay: {
    backgroundColor: "white",
    width: widthPercentageToDP("85%"),
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    marginTop: heightPercentageToDP("-4%"),
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: {
      height: 5,
      width: 1,
    },
  },
  questionsContainer: {
    flexDirection: "row",
    width: width,
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    paddingTop: 50,
  },
  InfoText: {
    color: "black",
  },
  greyText: {
    color: "grey",
  },
  textButton: {
    backgroundColor: "#233A44",
    padding: 20,
    width: width * 0.4,
    margin: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    elevation: 100,
    shadowRadius: 5,
    shadowOpacity: 0.1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#545A75",
  },
  text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default QuestionOverlay;
