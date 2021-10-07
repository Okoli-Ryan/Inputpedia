//import liraries
import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import BackArrow from "../assets/images/back-arrow.png";
import Home from "../assets/images/home.png";
import { useDispatch } from "react-redux";
import { setData } from "../store/actions";

// create a component
const HeaderLeft = ({ navigation }) => {
  const dispatch = useDispatch();

  const homeButton = () => {
    dispatch(setData(null));
    navigation.reset({ index: 0, routes: [{ name: "index" }] });
    // console.log(navigation)
  };

  const backButton = () => {
    console.log("po");
    if (navigation.canGoBack()) navigation.goBack();
    else {
      homeButton();
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={homeButton}>
        <Image style={styles.image} source={Home} />
      </TouchableOpacity>
      <TouchableOpacity onPress={backButton}>
        <Image style={styles.image} source={BackArrow} />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 60,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#f9f8f8",
    marginLeft: -16,
  },
  image: {
    width: 20,
    height: 20,
    // marginLeft: 20,
  },
});

//make this component available to the app
export default HeaderLeft;
