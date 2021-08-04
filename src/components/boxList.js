//import liraries
import React from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import Box from "./box";

// create a component
const BoxList = ({ items, onPress }) => {
  return (
    <FlatList
      data={items}
      contentContainerStyle={{
        marginRight: -10,
        marginLeft: 16,
      }}
      renderItem={({ item }) => (
        <>
          <View style={styles.container}>
            <Box
              border={false}
              text={item.text}
              completed={item.completed}
              onPress={() => onPress(item.text)}
            />
          </View>
          <Text
            style={[
              item.completed ? { color: "green" } : { color: "red" },
              styles.text,
            ]}>
            {item.completed ? "completed" : "incomplete"}
          </Text>
        </>
      )}
      keyExtractor={(item) => item.text}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "75%",
    borderRadius: 10,
    borderWidth: 0.5,
    height: 60,
    justifyContent: "center",
    borderColor: "#264653",
  },
  boxContainer: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    marginTop: 5,
    marginBottom: 10,
  },
});

//make this component available to the app
export default BoxList;
