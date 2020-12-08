import React, { useEffect, useState } from "react";
import Login from "./src/screens/login/Login";
import { LoadAssets } from "./src/components";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import SwipePremade from "./src/screens/swipe/SwipePremade";
import { ImageSourcePropType, LogBox } from "react-native";
import SignUp from "./src/screens/login/SignUp";
import { firebase } from "./src/firebaseconfig";
import SwipeCollections from "./src/screens/collections/SwipeCollections";
import SettingsScreen from "./src/screens/settings/SettingsScreen";

// LogBox.ignoreLogs(["Settin a timer"]);
console.disableYellowBox = true;

export type AuthenticationStackParameterList = {
  Swipe: { collectionId: string };
  Login: undefined;
  SignUp: undefined;
  Settings: undefined;
  Details: { image: ImageSourcePropType };
  SwipeCollections: undefined;
};

export const AuthenticationStack = createStackNavigator<
  AuthenticationStackParameterList
>();

const AuthenticationNavigator = () => {
  const [userId, setUserId] = useState(undefined);

  //TODO:Add Navbar
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
  }, [userId]);

  return (
    <AuthenticationStack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureDirection: "horizontal-inverted",
      }}>
      {userId !== null ? (
        <>
          <AuthenticationStack.Screen
            name="Swipe"
            component={SwipePremade}
            initialParams={{
              collectionId: "4KyX5l9TDwWCPhRylr9k", //"defaultCollection",
            }}></AuthenticationStack.Screen>
          <AuthenticationStack.Screen
            name="SwipeCollections"
            component={SwipeCollections}></AuthenticationStack.Screen>
          <AuthenticationStack.Screen
            name="Settings"
            component={SettingsScreen}></AuthenticationStack.Screen>
        </>
      ) : (
        <>
          <AuthenticationStack.Screen
            name="Login"
            component={Login}></AuthenticationStack.Screen>
          <AuthenticationStack.Screen
            name="SignUp"
            component={SignUp}></AuthenticationStack.Screen>
        </>
      )}
    </AuthenticationStack.Navigator>
  );
};

export default function App(): JSX.Element {
  // LogBox.ignoreLogs(["Setting a timer"]);

  return (
    <LoadAssets>
      <AuthenticationNavigator />
    </LoadAssets>
  );
}

// export default registerRootComponent(App);
