//import liraries
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
// create a component
const Header = () => {
  const lang = useSelector((state) => state.languageReducer);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.group}>
          <Text style={styles.staticLanguage}>Language:</Text>
          <View style={styles.circle} />
          <Text style={styles.lang}>{lang.toUpperCase()}</Text>
        </View>
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    backgroundColor: "#f9f8f8",
    marginRight: 18,
  },
  topic: {
    position: "absolute",
    fontFamily: "Poppins_medium",
    fontSize: 18,
    textAlign: "center",
    bottom: 3,
    marginLeft: Dimensions.get("window").width / 4,
    // right: 0,
    // marginLeft: -16,
    color: "#264653",
  },
  group: {
    alignSelf: "flex-end",
    marginTop: 8,
    marginRight: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  staticLanguage: {
    color: "#264653",
    marginRight: 10,
    fontFamily: "Poppins",
    fontSize: 12,
    flexDirection: "row",
    alignSelf: "center",
  },
  lang: {
    color: "#264653",
    fontFamily: "Poppins",
    fontSize: 14,
  },
  circle: {
    width: 5,
    height: 5,
    backgroundColor: "#e9c46a",
    borderRadius: 2.5,
    marginRight: 6,
    flexDirection: "row",
    alignSelf: "center",
  },
});

//make this component available to the app
export default Header;
