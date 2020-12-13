import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { globalVariables } from "../GlobalStyles";

interface SimpleTextInputProps {
  backgroundColor?: string;
  width?: number;
  height?: number;
  borderBottomWidth?: number;
  borderBottomColor?: string;
  margin?: number;
  cursorColor?: string;
  fontSize?: number;
  wrapperStyle?: StyleProp<ViewStyle>;
}

export default function SimpleTextInput({
  width = 260,
  height = 45,
  backgroundColor,
  margin = 3,

  ...props
}: SimpleTextInputProps & TextInputProps): JSX.Element {
  const [isFocused, setIsFocused] = useState(false);

  const onBlur = () => {
    // setInputStyle({});
    setIsFocused(false);
  };

  const onFocus = () => {
    // setInputStyle({ width: width, height: height });
    setIsFocused(true);
  };

  const styles = StyleSheet.create({
    container: {
      margin: margin,
    },
    simple: {
      width: width,
      height: height,
      color: globalVariables.light,
      backgroundColor,
      justifyContent: "center",
      fontFamily: "Montserrat_400Regular",
      paddingHorizontal: 20,
      borderBottomColor: globalVariables.light,
      borderBottomWidth: 3,
      fontSize: height / 3,
    },
    focused: {
      borderBottomColor: globalVariables.primaryOne,
      fontSize: height / 3,
    },
  });

  // const TextInput = styled.textInpt``;

  return (
    <View style={[styles.container, props.wrapperStyle]}>
      <TextInput
        style={[styles.simple, isFocused ? styles.focused : null]}
        placeholderTextColor={isFocused ? globalVariables.primaryOne : "#fff"}
        onBlur={() => onBlur()}
        onFocus={() => onFocus()}
        selectionColor={props.cursorColor}
        allowFontScaling={true}
        {...props}
      />
    </View>
  );
}
