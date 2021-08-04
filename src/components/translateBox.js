//import liraries
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
const TranslateBox = ({ label, children }) => {
  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 0, fontFamily: "Poppins_medium" }}>
        {label}
      </Text>
      <View
        style={{
          width: "100%",
          elevation: 3,
          height: "100%",
          padding: 16,
          borderWidth: 0,
        }}>
        {children}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
});

//make this component available to the app
export default TranslateBox;
