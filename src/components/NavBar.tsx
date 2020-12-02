import { useNavigation } from "@react-navigation/native";
import { StackHeaderProps, StackScreenProps } from "@react-navigation/stack";
import React, { ReactElement } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthenticationStackParameterList } from "../../App";
import { globalVariables } from "../GlobalStyles";
import { SCREEN_WIDTH } from "../utils/Utils";

export default function NavBar(props: {
  stackProps?: StackHeaderProps;
}): ReactElement {
  const navigation = useNavigation();

  return (
    <View style={styles.navbarContainer}>
      <View>
        <Text style={styles.text}>Settings</Text>
      </View>
      <View>
        <Text style={styles.text} onPress={() => navigation.navigate("Swipe")}>
          Swipe
        </Text>
      </View>
      <View>
        <Text
          style={styles.text}
          onPress={() => navigation.navigate("Collections")}>
          Collections
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    width: SCREEN_WIDTH,
    height: globalVariables.navBarHeight,
    backgroundColor: globalVariables.darkBackground,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "flex-end",

    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  text: {
    color: globalVariables.light,
    fontSize: 20,
    fontFamily: globalVariables.montserrat300Light,
  },
});
