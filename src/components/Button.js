//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

// create a component
const Button = ({
  onPress,
  exStyles,
  text,
  disabled,
  textStyle,
  onLongPress,
  loading,
}) => {
  return (
    <>
      {!loading ? (
        <TouchableOpacity
          onPress={onPress}
          disabled={disabled}
          onLongPress={onLongPress}>
          <View
            style={[
              styles.container,
              { ...exStyles },
              disabled && { opacity: 0.5 },
            ]}>
            <Text style={[styles.text, textStyle]}>{text}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.container,
            { ...exStyles },
            disabled && { opacity: 0.5 },
          ]}>
          <ActivityIndicator size="small" color="white" />
        </View>
      )}
    </>
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
