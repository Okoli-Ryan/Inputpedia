//import liraries
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Box from "../components/box";
import Arrow from "../assets/images/down-arrow.png";
import { useDispatch } from "react-redux";
import { setLang } from "../store/actions";
import Button from "../components/Button";

const languages = ["Igbo", "Hausa", "Yoruba"];

// create a component
const IndexScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    selected: null,
    drop: false,
  });

  const handleSetLanguage = () => {
    dispatch(setLang(value.selected));
    if (value.selected === "English") navigation.navigate("english");
    else navigation.navigate("topic");
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.caption}>
          What language do you want to translate to?
        </Text>

        <View style={styles.container}>
          <Box
            border={false}
            text={value.selected ? value.selected : "Select Language"}
            image={Arrow}
            onPress={() => {
              setValue((prev) => {
                return {
                  ...prev,
                  drop: !prev.drop,
                };
              });
            }}
          />
          {value.drop &&
            languages.map((item, id) => (
              <Box
                key={id}
                text={item}
                border
                onPress={() =>
                  setValue((prev) => {
                    return {
                      ...prev,
                      drop: false,
                      selected: item,
                    };
                  })
                }
              />
            ))}
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 24,
          width: "100%",
        }}>
        <Button
          text="Continue"
          onPress={handleSetLanguage}
          exStyles={{ alignSelf: "center" }}
          textStyle={value.selected ? {} : { opacity: 0.5 }}
          disabled={!value.selected}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
        }}>
        <Button
          exStyles={{ width: 40, height: 40, backgroundColor: "#f9f8f8" }}
          onLongPress={() =>
            setValue((prev) => {
              return {
                ...prev,
                drop: false,
                selected: "English",
              };
            })
          }
        />
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "75%",
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    borderColor: "#264653",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f8f8",
  },
  caption: {
    marginBottom: 16,
    fontFamily: "Poppins",
  },
});

//make this component available to the app
export default IndexScreen;
