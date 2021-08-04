//import liraries
import "react-native-gesture-handler";
import React, { Component } from "react";
import { View } from "react-native";
import IScreen from "./src/screens/indexScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TopicScreen from "./src/screens/topicScreen";
import ImageTranslate from "./src/components/imageTranslate";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./src/store/configureStore";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";

// create a component
const App = () => {
  const { Screen, Navigator } = createNativeStackNavigator();

  const [fontsLoaded] = useFonts({
    Poppins: require("./src/assets/fonts/Poppins-Regular.ttf"),
    Poppins_medium: require("./src/assets/fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <View />;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Screen name="index" component={IScreen} />
              <Screen name="topic" component={TopicScreen} />
              <Screen name="translate" component={ImageTranslate} />
            </Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
};

//make this component available to the app
export default App;
