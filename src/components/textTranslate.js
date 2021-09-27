//import liraries
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { setData, setModal } from "../store/actions";
import TBox from "./translateBox";
import { Db } from "../firebase";
import NetInfo from "@react-native-community/netinfo";

// create a component
const TextTranslate = ({ navigation, route }) => {
  const lang = useSelector((state) => state.languageReducer);
  const topic = useSelector((state) => state.topicReducer);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [englishText, setEnglishText] = useState({ text: "", loading: true });

  useEffect(() => {
    if (lang !== "English") {
      try {
        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            Db.collection("data")
              .doc("documents")
              .get()
              .then((doc) => {
                setEnglishText({
                  text: doc.data()[`${topic.category}`][`${topic.name}`]
                    .English,
                  loading: false,
                });
              });
          } else {
            dispatch(setModal({ type: "error", display: true }));
          }
        });
      } catch (e) {
        dispatch(setModal({ type: "error", display: true }));
      }
    }
  }, [topic, lang]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%" }}>
        <ScrollView>
          {lang !== "English" && (
            <TBox label="English" exStyle={{ height: "auto" }}>
              {englishText.loading ? (
                <ActivityIndicator size="large" color="#264653" />
              ) : (
                <Text style={{ lineHeight: 30, fontFamily: "Poppins" }}>
                  {englishText.text}
                </Text>
              )}
            </TBox>
          )}
          <TBox label={lang} exStyle={{ height: "auto" }}>
            <TextInput
              multiline
              style={{ lineHeight: 30, fontFamily: "Poppins", width: "100%" }}
              placeholder="Type your translated sentence here"
              onChangeText={(e) => setText(e)}
              value={text}
            />
          </TBox>
          <View style={{ width: "100%" }}>
            <Button
              text="Continue"
              disabled={!text}
              exStyles={{ marginVertical: 16 }}
              onPress={() => {
                dispatch(setData({ type: "text", data: text }));
                navigation.navigate("record");
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f9f8f8",
    paddingHorizontal: 16,
    // width: "100%",
  },
});

//make this component available to the app
export default TextTranslate;
