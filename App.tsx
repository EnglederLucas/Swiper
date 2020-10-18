import React from "react";
import Login from "./login/Login";
import { createStackNavigator } from "@react-navigation/stack";
import { LoadAssets } from "./components";

const AuthenticationStack = createStackNavigator();
const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator>
      <AuthenticationStack.Screen
        name="Login"
        component={Login}
      ></AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
  );
};

export default function App() {
  return (
    <LoadAssets>
      <AuthenticationNavigator />
    </LoadAssets>
  );
}
