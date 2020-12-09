import { LinearGradient } from "expo-linear-gradient";
import { auth } from "./../../firebaseconfig";
import React from "react";
import { View, Text } from "react-native";
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { SwiperButton } from "../../components";
import NavBar from "../../components/NavBar";
import { globalVariables } from "../../GlobalStyles";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/Utils";

const SettingsScreen = () => {
  const width = 50;
  const height = 50;

  return (
    <View style={{ display: "flex", height: SCREEN_HEIGHT }}>
      <NavBar></NavBar>
      <Text
        style={{
          fontSize: 30,
          fontFamily: globalVariables.montserrat600SemiBold,
          color: globalVariables.light,
          textAlign: "left",
          marginLeft: 30,
          marginTop: 40,
        }}>
        Settings
      </Text>

      {/* {/* <LinearGradient
        style={{ height: "100%", width: "100%", borderRadius: 20 }}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        colors={[globalVariables.primaryTwo, globalVariables.primaryOne]}>
        <Text>Joe</Text>
      </LinearGradient> */}
      {/* <LinearGradient
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        colors={[globalVariables.primaryOne, globalVariables.primaryTwo]}
        style={{ width, height, borderRadius: 50, justifyContent: "center" }}>
        <Text
          style={{
            fontSize: height / 2.5,
            fontFamily: "Montserrat_600SemiBold",
            textAlign: "center",
            color: "#ffffff",
            backgroundColor: "transparent",
          }}>
          Test
        </Text>
      </LinearGradient>

      <LinearGradient
        style={{ height: height, width: 310, borderRadius: 20 }}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        colors={[globalVariables.primaryOne, globalVariables.primaryTwo]}>
        <Text>Mama</Text>
      </LinearGradient>

      <LinearGradient
        style={{ height: height, width: 320, borderRadius: 20 }}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        colors={[globalVariables.primaryOne, globalVariables.primaryTwo]}>
        <Text>Mama</Text>
      </LinearGradient>

      <View>
        <LinearGradient
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          colors={[globalVariables.primaryOne, globalVariables.primaryTwo]}
          style={{ width, height, borderRadius: 50, justifyContent: "center" }}>
          <Text
            style={{
              fontSize: height / 2.5,
              fontFamily: "Montserrat_600SemiBold",
              textAlign: "center",
              color: "#ffffff",
              backgroundColor: "transparent",
            }}>
            Test
          </Text>
        </LinearGradient>
      </View>  */}

      <View
        style={{
          height: "65%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}>
        <SwiperButton
          onPress={() => auth().signOut()}
          title="Logout"></SwiperButton>
      </View>
    </View>
  );
};

export default SettingsScreen;
