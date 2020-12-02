import React from "react";
import Login from "./src/login/Login";
import { LoadAssets } from "./src/components";
import { createStackNavigator } from "@react-navigation/stack";
import SwipePremade from "./src/swipe/SwipePremade";
import DetailView from "./src/swipe/DetailView";
import { ImageSourcePropType } from "react-native";
import NavBar from "./src/components/NavBar";
import { SCREEN_WIDTH } from "./src/utils/Utils";
import { globalVariables } from "./src/GlobalStyles";
import SwipeCollections from "./src/collections/SwipeCollections";

export type AuthenticationStackParameterList = {
  Swipe: undefined;
  Login: undefined;
  Details: { image: ImageSourcePropType };
  Collections: undefined;
};

export const AuthenticationStack = createStackNavigator<
  AuthenticationStackParameterList
>();

const AuthenticationNavigator = () => {
  // TODO:Add Navbar

  //headerMode="none"
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen
        name="Swipe"
        // options={{
        //   // header: NavBar,

        //   headerStyle: {
        //     backgroundColor: "blue",
        //   },
        // }
        // }
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
      <AuthenticationStack.Screen
        name="Login"
        component={Login}></AuthenticationStack.Screen>
      <AuthenticationStack.Screen
        name="Collections"
        component={SwipeCollections}></AuthenticationStack.Screen>
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
