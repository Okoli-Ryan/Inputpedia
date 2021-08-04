//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// create a component
const Button = ({ onPress, exStyles, text, disabled, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.container, { ...exStyles }]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "75%",
    backgroundColor: "#264653",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontFamily: "Poppins",
  },
});

//make this component available to the app
export default Button;
