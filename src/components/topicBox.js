//import liraries
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Box from "./box";
import { Db } from "../firebase";
// create a component
const TopicBox = ({ item, onPress }) => {
  return (
    <>
      <View style={styles.container}>
        <Box border={false} text={item.name} onPress={() => onPress(item)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 0.5,
    // marginVertical: 8,
    height: 60,
    justifyContent: "center",
    borderColor: "#264653",
  },
});

//make this component available to the app
export default TopicBox;
