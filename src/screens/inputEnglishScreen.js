//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, SafeAreaView } from "react-native";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { setTopic as setDispatchTopic } from "../store/actions";
import firebase, { Db } from "../firebase";

// create a component
const EnglishScreen = ({ navigation }) => {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const addTopic = async () => {
    const _topic = topic.trim().toLowerCase();
    const _category = category.trim().toLowerCase();

    dispatch(
      setDispatchTopic({
        name: _topic,
        category: _category,
      })
    );
    setTopic("");
    setCategory("");
    navigation.navigate("translate");
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.text}>Topic:</Text>
          <TextInput
            style={styles.textInput}
            value={topic}
            onChangeText={(e) => setTopic(e)}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.text}>Category:</Text>
          <TextInput
            style={styles.textInput}
            value={category}
            onChangeText={(e) => setCategory(e)}
          />
        </View>
      </SafeAreaView>
      <View style={[styles.formContainer, { bottom: 16 }]}>
        <Button text="Continue" onPress={addTopic} />
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f8f8",
  },
  formContainer: {
    flexDirection: "column",
    width: "100%",
  },
  text: {
    fontFamily: "Poppins",
    marginBottom: 10,
  },
  textInput: {
    fontFamily: "Poppins",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 6,
    marginBottom: 16,
    paddingLeft: 16,
  },
});

//make this component available to the app
export default EnglishScreen;
