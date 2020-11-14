import React, { useState } from "react";
import Login from "./src/login/Login";
import { LoadAssets } from "./src/components";
import Swipe from "./src/swipe/Swipe";
import { createStackNavigator } from "@react-navigation/stack";
import SwipePremade from "./src/swipe/SwipePremade";
import { registerRootComponent } from "expo";
import DetailView from "./src/swipe/DetailView";
import { ImageSourcePropType } from "react-native";
import SignUp from "./src/login/SignUp";

export type AuthenticationStackParameterList = {
  Swipe: undefined;
  Login: undefined;
  SignUp: undefined;
  Details: { image: ImageSourcePropType };
};

export const AuthenticationStack = createStackNavigator<
  AuthenticationStackParameterList
>();

const AuthenticationNavigator = () => {
  const [user, setUser] = useState(null);

  //TODO:Add Navbar
  return (
    <AuthenticationStack.Navigator headerMode="none">
      {user ? (
        <>
          <AuthenticationStack.Screen
            name="Swipe"
            component={SwipePremade}></AuthenticationStack.Screen>
          <AuthenticationStack.Screen
            name="Details"
            component={DetailView}
            initialParams={{
              image: {
                uri:
                  "https://image.tmdb.org/t/p/original/uTylq8v3lfMUHMt3n0Tb4bA9CtG.jpg",
              },
            }}></AuthenticationStack.Screen>
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
