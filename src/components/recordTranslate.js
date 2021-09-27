//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import TBox from "./translateBox";
import RecordComponent from "./recordComp";
import Modal from "./modal";
import { upload, deleteSound } from "./functions/record";
import { setModal, removeModal } from "../store/actions";
// create a component
const RecordTranslate = ({ goBack }) => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.languageReducer);
  const topic = useSelector((state) => state.topicReducer);
  const params = useSelector((state) => state.dataReducer);
  const [sound, setSound] = useState(null);
  const [recording, setRecording] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        save={() => {
          upload(
            sound,
            params,
            lang,
            topic,
            recording,
            `${lang}_${topic.category}_${topic.name}`,
            () => {
              dispatch(removeModal());
              goBack();
            },
            () => dispatch(setModal({ type: "error", display: true }))
          );
        }}
        delete={() => deleteSound(sound, setSound, setRecording)}
      />
      <ScrollView>
        <TBox label={lang} exStyle={{ height: "auto" }}>
          {params.type === "text" ? (
            <Text style={{ lineHeight: 30, fontFamily: "Poppins" }}>
              {params.data}
            </Text>
          ) : (
            <Image
              source={{ uri: params.data }}
              style={{ width: null, height: 400, resizeMode: "cover" }}
            />
          )}
        </TBox>
        <TBox label="Record">
          <RecordComponent
            sound={sound}
            setSound={setSound}
            recording={recording}
            setRecording={setRecording}
          />
        </TBox>
        <View style={{ marginVertical: 16 }}>
          <Button
            text="Submit"
            disabled={!sound}
            onPress={() => dispatch(setModal({ type: "save", display: true }))}
            // onPress={() => console.log(params)}
            // onPress={() =>
            //   uploadAudio(recording, `${lang}_${topic.category}_${topic.text}`)
            // }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f8f8",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

//make this component available to the app
export default RecordTranslate;
