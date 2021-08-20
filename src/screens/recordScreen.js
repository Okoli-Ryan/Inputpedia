import React from "react";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RecordScreen from "../components/recordTranslate";

const Tab = createMaterialTopTabNavigator();

function MyTabs({ navigation }) {
  const totalWidth = Dimensions.get("screen").width;
  const lang = useSelector((state) => state.languageReducer);

  const goBack = () => {
    if (lang === "English") {
      navigation.navigate("english");
    } else {
      navigation.navigate("topic");
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          color: "#264653",
          fontFamily: "Poppins",
          textTransform: "none",
          fontSize: 14,
        },
        tabBarIndicatorStyle: {
          width: totalWidth / 4,
          left: totalWidth / 2.675,
          backgroundColor: "#e9c46a",
        },

        tabBarStyle: {
          elevation: 0,
        },
      }}>
      <Tab.Screen
        options={{ title: "Record" }}
        name="rec"
        children={() => <RecordScreen goBack={goBack} />}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
