import React from "react";
import { Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TextScreen from "../components/textTranslate";
import ImageScreen from "../components/imageTranslate";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const totalWidth = Dimensions.get("screen").width;

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
          left: totalWidth / 8,
          backgroundColor: "#e9c46a",
        },

        tabBarStyle: {
          elevation: 0,
        },
      }}>
      <Tab.Screen name="Text" component={TextScreen} />
      <Tab.Screen name="Camera" component={ImageScreen} />
    </Tab.Navigator>
  );
}

export default MyTabs;
