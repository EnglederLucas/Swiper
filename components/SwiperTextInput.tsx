import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface SwiperTextInput {}

export default function SwiperTextInput(
  props: SwiperTextInput & TextInputProps
) {
  const baseStyle: StyleProp<TextStyle> = {
    height: 60,
    borderWidth: 5,
    borderRadius: 100,
    borderColor: "#fff",
    color: "#fff",
    fontFamily: "Montserrat_300Light",
    // fontWeight: "300",
    paddingHorizontal: 20,
    width: 260,
    letterSpacing: 2,
  };

  const initial: StyleProp<TextStyle> = {};

  const [style, setStyle] = useState(initial);

  const onBlur = () => {
    setStyle({});
  };

  const onFocus = () => {
    setStyle({ borderColor: "linear" });
  };

  return (
    <LinearGradient
      colors={["#EFBB35", "#4AAE9B"]}
      style={{ padding: 2 }} // add padding so it work as border of TextInput
    >
      <TextInput
        style={{ ...baseStyle, ...style }}
        placeholderTextColor="#fff"
        onBlur={() => onBlur()}
        onFocus={() => onFocus()}
        {...props}
      />
    </LinearGradient>
  );
}
