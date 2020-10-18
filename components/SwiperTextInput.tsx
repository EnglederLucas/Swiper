import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { globalVariables } from "../GlobalStyles";

interface SwiperTextInput {
  backgroundColor?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  borderWidth?: number;
  style?: StyleProp<ViewStyle>;
}

export default function SwiperTextInput({
  backgroundColor = globalVariables.darkBackground,
  width = 260,
  height = 45,
  borderRadius = 50,
  borderWidth = 10,
  ...props
}: SwiperTextInput & TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyle: StyleProp<TextStyle> = {
    height,
    width,
    color: "#fff",
    backgroundColor,
    fontFamily: "Montserrat_400Regular",
    paddingHorizontal: 20,
    // letterSpacing: 1,
    borderStyle: "solid",
    borderRadius,
    borderColor: "#fff",
  };

  const gradientStyle: StyleProp<ViewStyle> = {
    height: height + borderWidth,
    width: width + borderWidth,
    alignItems: "center",
    justifyContent: "center",
    borderRadius,
  };

  const initial: StyleProp<TextStyle> = {};

  const [inputStyle, setInputStyle] = useState(initial);

  const onBlur = () => {
    setInputStyle({});
    setIsFocused(false);
  };

  const onFocus = () => {
    setInputStyle({ width: width, height: height });
    setIsFocused(true);
  };

  return (
    <LinearGradient
      style={{ ...gradientStyle, marginBottom: 10 }}
      start={{ x: 0.0, y: 0.5 }}
      end={{ x: 1.0, y: 0.5 }}
      colors={
        isFocused
          ? [globalVariables.primaryOne, globalVariables.primaryTwo]
          : [globalVariables.light, globalVariables.light]
      }
    >
      <TextInput
        style={{ ...baseStyle, ...inputStyle }}
        placeholderTextColor={isFocused ? globalVariables.primaryOne : "#fff"}
        onBlur={() => onBlur()}
        onFocus={() => onFocus()}
        {...props}
      />
    </LinearGradient>
  );
}
