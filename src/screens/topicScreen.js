//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BoxList from "../components/boxList";
import { topics } from "../testConstants";

// create a component
const TopicScreen = ({ navigation }) => {
  const onPress = (data) => {
    navigation.navigate("translate", { data: data });
  };
  return (
    <SafeAreaView style={styles.container}>
      <BoxList items={topics} onPress={onPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f8f8",
  },
});

//make this component available to the app
export default TopicScreen;
