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
import {
  GestureDirection,
  StackCardStyleInterpolator,
} from "@react-navigation/stack/lib/typescript/src/types";
import { registerRootComponent } from "expo";
// import { SplashScreen } from "expo";

LogBox.ignoreLogs(["Setting a timer"]);
// console.disableYellowBox = true;

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
  const [userId, setUserId] = useState("");

  //TODO:Add Navbar
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
  }, [userId]);

  const rightToLeftAnimation = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    gestureDirection: "horizontal-inverted" as GestureDirection,
  };
  const leftToRightAnimation = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    gestureDirection: "horizontal" as GestureDirection,
  };

  return (
    <AuthenticationStack.Navigator headerMode="none">
      {userId !== null && userId !== undefined ? (
        <>
          <AuthenticationStack.Screen
            name="Swipe"
            component={SwipePremade}
            initialParams={{
              collectionId: "", //"defaultCollection",
            }}></AuthenticationStack.Screen>
          <AuthenticationStack.Screen
            name="SwipeCollections"
            component={SwipeCollections}
            options={rightToLeftAnimation}></AuthenticationStack.Screen>
          <AuthenticationStack.Screen
            name="Settings"
            component={SettingsScreen}
            options={leftToRightAnimation}></AuthenticationStack.Screen>
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
  return (
    <LoadAssets>
      <AuthenticationNavigator />
    </LoadAssets>
  );
}

// export default registerRootComponent(App);
