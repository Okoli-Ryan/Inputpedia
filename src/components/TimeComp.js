import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

String.prototype.toMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};
// create a component
const TimeComp = ({ isRecording, sound }) => {
  let timer = useRef(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    // if(isRecording){
    //     setTime(prev => prev + 1)
    // }
    if (isRecording) {
      timer.current = setTimeout(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearTimeout(timer.current);
    }

    return () => clearTimeout(timer);
  }, [isRecording, time]);
  useEffect(() => {
    if (!sound) setTime(0);
  }, [sound]);
  return <Text style={styles.time}>{time.toString().toMMSS()}</Text>;
};

const styles = StyleSheet.create({
  time: {
    color: "#264653",
    fontSize: 40,
    marginBottom: 10,
  },
});

export default TimeComp;
