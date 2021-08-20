//import liraries
import "react-native-gesture-handler";
import React, { Component } from "react";
import { View } from "react-native";
import IScreen from "./src/screens/indexScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TopicScreen from "./src/screens/topicScreen";
import TranslateScreen from "./src/screens/translateScreen";
import RecordScreen from "./src/screens/recordScreen";
import EnglishScreen from "./src/screens/inputEnglishScreen";
import HeaderLeft from "./src/components/headerLeft";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import store from "./src/store/configureStore";
import { Provider } from "react-redux";
import Header from "./src/components/header";
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
                orientation: "portrait",
              }}>
              <Screen
                options={{
                  headerShown: false,
                }}
                name="index"
                component={IScreen}
              />
              <Screen
                options={({ navigation, route }) => ({
                  headerBackVisible: false,
                  headerLeft: (props) => (
                    <HeaderLeft {...props} navigation={navigation} />
                  ),
                  headerTitle: (props) => <Header {...props} />,
                  headerStyle: {
                    elevation: 0,
                  },
                })}
                name="topic"
                component={TopicScreen}
              />
              <Screen
                options={({ navigation, route }) => ({
                  headerBackVisible: false,
                  headerLeft: (props) => (
                    <HeaderLeft {...props} navigation={navigation} />
                  ),
                  headerTitle: (props) => <Header {...props} />,
                  headerStyle: {
                    elevation: 0,
                  },
                })}
                name="translate"
                component={TranslateScreen}
              />
              <Screen
                options={({ navigation, route }) => ({
                  headerBackVisible: false,
                  headerLeft: (props) => (
                    <HeaderLeft {...props} navigation={navigation} />
                  ),
                  headerTitle: (props) => <Header {...props} />,
                  headerStyle: {
                    elevation: 0,
                  },
                })}
                name="record"
                component={RecordScreen}
              />
              <Screen
                options={({ navigation, route }) => ({
                  headerBackVisible: false,
                  headerLeft: (props) => (
                    <HeaderLeft {...props} navigation={navigation} />
                  ),
                  headerTitle: (props) => <Header {...props} />,
                  headerStyle: {
                    elevation: 0,
                  },
                })}
                name="english"
                component={EnglishScreen}
              />
            </Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
};

//make this component available to the app
export default App;
