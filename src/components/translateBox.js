//import liraries
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
const TranslateBox = ({ label, children, exStyle }) => {
  return (
    <View style={[styles.container]}>
      <Text
        style={{
          marginBottom: 0,
          fontFamily: "Poppins_medium",
          color: "#264653",
        }}>
        {label}
      </Text>
      <View
        style={[
          {
            flex: 1,
            elevation: 1,
            height: 300,
            padding: 16,
            borderWidth: 0,
          },
          exStyle,
        ]}>
        {children}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
  },
});

//make this component available to the app
export default TranslateBox;
