import React from "react"
import Login from "./login/Login"
import { createStackNavigator } from "@react-navigation/stack"
import { LoadAssets } from "./components"
import Swipe from "./swipe/Swipe"

export const AuthenticationStack = createStackNavigator()

const AuthenticationNavigator = () => {
  // TODO:Add Navbar
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen
        name="Swipe"
        component={Swipe}
      ></AuthenticationStack.Screen>
      <AuthenticationStack.Screen
        name="Login"
        component={Login}
      ></AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
  )
}

export default function App() {
  return (
    <LoadAssets>
      <AuthenticationNavigator />
    </LoadAssets>
  )
}
