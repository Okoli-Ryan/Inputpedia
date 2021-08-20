//import liraries
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  startRecording,
  stopRecording,
  playSound,
  pauseSound,
} from "./functions/record";
import { Audio } from "expo-av";
import { setModal } from "../store/actions";
import Play from "../assets/images/play.png";
import Trash from "../assets/images/delete.png";
import TimeComp from "./TimeComp";

// create a component
const RecordComp = ({ sound, setSound, recording, setRecording }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync();
    })();
  }, []);

  const [isRecording, setIsRecording] = useState(false);

  //   const startRec = () => {
  //     recording = startRecording(sound, setIsRecording, setSound);
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.staticText}>
        Press button to record, press again to stop recording
      </Text>
      <TimeComp isRecording={isRecording} sound={sound} />
      <View style={styles.button_container}>
        {sound && (
          <TouchableOpacity
            onPress={() =>
              dispatch(setModal({ type: "delete", display: true }))
            }>
            <Image
              source={Trash}
              style={{
                width: 25,
                height: 25,
                bottom: -12,
              }}
            />
          </TouchableOpacity>
        )}

        {!sound ? (
          <TouchableOpacity
            onPress={
              !recording
                ? () => {
                    startRecording(
                      sound,
                      setIsRecording,
                      setSound,
                      setRecording
                    );
                  }
                : () => stopRecording(recording, setSound, setIsRecording)
            }>
            <View style={styles.button}></View>
          </TouchableOpacity>
        ) : (
          <View style={styles.button_record_done} />
        )}
        {sound && (
          <TouchableOpacity onPress={() => playSound(sound)}>
            <Image
              source={Play}
              style={{
                width: 25,
                height: 25,
                bottom: -12,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      {!isRecording ? (
        <>
          {!sound ? (
            <Text style={styles.recordText}>Start recording</Text>
          ) : (
            <Text style={styles.recordText_recording}>Recording complete</Text>
          )}
        </>
      ) : (
        <Text style={styles.recordText_recording}>Recording...</Text>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#e40000",
    height: 48,
    width: 48,
    borderRadius: 24,
    marginBottom: 12,
  },
  button_record_done: {
    backgroundColor: "#e9c46a",
    height: 48,
    width: 48,
    marginHorizontal: 48,
    marginBottom: 12,
    borderRadius: 24,
  },
  time: {
    color: "#264653",
    fontSize: 40,
    marginBottom: 10,
  },
  recordText: {
    color: "#264653",
    fontFamily: "Poppins",
  },
  staticText: {
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Poppins",
  },
  recordText_recording: {
    color: "#02b709",
    fontFamily: "Poppins",
  },
  button_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
});

//make this component available to the app
export default RecordComp;
