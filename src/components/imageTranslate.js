//import liraries
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../store/actions";
import TBox from "./translateBox";
import * as ImagePicker from "expo-image-picker";
import CameraIcon from "../assets/images/camera.png";

// create a component
const ImageTranslate = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.languageReducer);

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const selectImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TBox label={lang}>
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center" }}
          onPress={selectImage}>
          {!image ? (
            <>
              <Text style={styles.text}>
                Please upload a very clear image of your translation
              </Text>
              <Image source={CameraIcon} style={styles.camera} />
            </>
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                resizeMode: "cover",
                width: 300,
                height: 400,
              }}
            />
          )}
        </TouchableOpacity>
      </TBox>
      {/* <TBox label="English">
        <ScrollView>
          <Text style={{ lineHeight: 30, fontFamily: "Poppins" }}>
            Àmàlà is a local indigenous Nigerian food, native to the Yoruba
            ethnic group. It is made out of yam and/or cassava flour, or unripe
            plantain flour. Yams are peeled, sliced, cleaned, dried and then
            blended into a flour, also called èlùbọ́. Yams are white in colour
            but turn brown when dried It could be served with a variety of
            soups, such as ẹ̀fọ́, ilá, ewédú, ogbono or gbẹ̀gìrì.
          </Text>
        </ScrollView>
      </TBox> */}
      <View style={{ marginVertical: 16, width: "100%" }}>
        <Button
          text="Continue"
          disabled={!image}
          onPress={() => {
            dispatch(setData({ type: "image", data: image }));
            navigation.navigate("record");
          }}
        />
      </View>
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
  text: {
    fontFamily: "Poppins",
    lineHeight: 30,
    textAlign: "center",
  },
  camera: {
    marginTop: 10,
    height: 30,
    width: 30,
    alignSelf: "center",
  },
});

//make this component available to the app
export default ImageTranslate;
