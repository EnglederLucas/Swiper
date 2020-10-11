import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Login from "./login/Login";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_300Light,
} from "@expo-google-fonts/montserrat";

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_300Light,
  });

  if (!fontsLoaded) {
  }

  return (
    <View style={styles.container}>
      <Login></Login>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1B1B",
    alignItems: "center",
    justifyContent: "center",
  },
});
