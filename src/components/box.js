//import liraries
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// create a component
const Box = ({ text, image, onPress, border }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[styles.selectLanguage, border ? { borderTopWidth: 0.5 } : {}]}>
        <Text style={styles.boxText}>{text}</Text>
        <Image style={styles.image} source={image} />
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  selectLanguage: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#264653",
    width: "100%",
    paddingVertical: 20,
  },
  boxText: {
    color: "#264653",
    marginLeft: 32,
    fontFamily: "Poppins",
  },
  image: {
    width: 9,
    height: 4.5,
    marginRight: 32,
  },
});

//make this component available to the app
export default Box;
