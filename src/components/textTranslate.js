//import liraries
import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Button from "./Button";
import { useSelector } from "react-redux";
import TBox from "./translateBox";

// create a component
const TextTranslate = ({ navigation, route }) => {
  const lang = useSelector((state) => state);
  // const getLanguage = () => {
  //   console.log("w");
  // };
  return (
    <SafeAreaView style={styles.container}>
      <TBox label="English">
        <ScrollView>
          <Text style={{ lineHeight: 30 }}>
            Àmàlà is a local indigenous Nigerian food, native to the Yoruba
            ethnic group. It is made out of yam and/or cassava flour, or unripe
            plantain flour. Yams are peeled, sliced, cleaned, dried and then
            blended into a flour, also called èlùbọ́. Yams are white in colour
            but turn brown when dried It could be served with a variety of
            soups, such as ẹ̀fọ́, ilá, ewédú, ogbono or gbẹ̀gìrì.
          </Text>
        </ScrollView>
      </TBox>
      <TBox label={lang}>
        <ScrollView>
          <Text style={{ lineHeight: 30 }}>
            Àmàlà is a local indigenous Nigerian food, native to the Yoruba
            ethnic group. It is made out of yam and/or cassava flour, or unripe
            plantain flour. Yams are peeled, sliced, cleaned, dried and then
            blended into a flour, also called èlùbọ́. Yams are white in colour
            but turn brown when dried It could be served with a variety of
            soups, such as ẹ̀fọ́, ilá, ewédú, ogbono or gbẹ̀gìrì.
          </Text>
        </ScrollView>
      </TBox>
      <View style={{ marginVertical: 16, width: "100%" }}>
        <Button text="Continue" disabled={false} />
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
    padding: 16,
  },
});

//make this component available to the app
export default TextTranslate;
