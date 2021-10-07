//import liraries
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Box from "./box";
import TopicBox from "./topicBox";

// create a component
const BoxList = ({ items, onPress }) => {
  return (
    <FlatList
      data={items}
      contentContainerStyle={{
        marginRight: 16,
        marginLeft: 16,
      }}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Box border={false} text={item.name} onPress={() => onPress(item)} />
        </View>
      )}
      keyExtractor={(item) => item.name}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "82.7%",
    borderRadius: 10,
    marginVertical: 8,
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
    marginTop: 3,
    marginBottom: 10,
  },
});

//make this component available to the app
export default BoxList;
