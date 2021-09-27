//import liraries
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setModal, setTopic } from "../store/actions";
import BoxList from "../components/boxList";
import { Db } from "../firebase";
import Modal from "../components/modal";
import NetInfo from "@react-native-community/netinfo";
import { useIsFocused } from "@react-navigation/native";

// import { topics } from "../testConstants";

// create a component
const TopicScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.languageReducer);
  const isFocused = useIsFocused();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const onPress = (data) => {
    navigation.navigate("translate", { data: data });
    dispatch(setTopic(data));
  };

  useEffect(() => {
    try {
      let subscriber = () => {};
      NetInfo.fetch()
        .then((state) => {
          if (state.isConnected) {
            subscriber = Db.collection("data")
              .doc(`topics_${lang}`)
              .onSnapshot((snapshot) => {
                let topicList = [];

                const temp = snapshot.data()[`${lang}`];
                temp.map((e) =>
                  topicList.push({
                    name: e.split("_")[0],
                    category: e.split("_")[1],
                  })
                );
                // console.log(topicList);
                setTopics(topicList);
                setLoading(false);
              });
          } else {
            setLoading(false);
            dispatch(setModal({ type: "error", display: true }));
          }
        })
        .catch((e) => {
          dispatch(setModal({ type: "error", display: true }));
        });

      return () => subscriber();
    } catch (_) {
      dispatch(setModal({ type: "error", display: true }));
    }
  }, [lang]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(setTopic({ name: "Select Category" }));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator color="#264653" size="large" />
      ) : topics.length !== 0 ? (
        <BoxList items={topics} onPress={onPress} />
      ) : (
        <></>
      )}
      {isFocused && <Modal />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f8f8",
  },
});

//make this component available to the app
export default TopicScreen;
