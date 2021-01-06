import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
} from "react-native";
import { tailwind } from "../../tailwind";
import { globalVariables } from "../GlobalStyles";

type ClickableProps = {
  onPress?: () => void;
  onLongPress?: () => void;
  highlightColor?: string;
};

type CardWrapperProps = {
  children: JSX.Element;
  backgroundColor?: string;
  marginTop?: number;
  borderRadius?: number;
  padding?: number;
  style?: StyleProp<ViewStyle>;
  shadow?: boolean;
} & ClickableProps;

export default function CardWrapper({
  backgroundColor = "#1B1B1B",
  padding = 10,
  marginTop = 0,
  borderRadius = 8,
  ...props
}: CardWrapperProps): JSX.Element {
  const [selected, setSelected] = useState(false);

  const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
    card: {
      backgroundColor,
      marginTop,
      borderRadius,
      padding,
    },
  });

  if (props.onPress) {
    return (
      <TouchableHighlight
        onLongPress={props.onLongPress}
        onPress={() => {
          props.onPress();
          setSelected(s => !s);
        }}
        style={[
          tailwind("w-19/20"),
          styles.card,
          props.shadow && styles.shadow,
          selected && { backgroundColor: globalVariables.primaryOne },
          props.style,
        ]}>
        <View style={tailwind("pl-2")}>{props.children}</View>
      </TouchableHighlight>
    );
  }

  return (
    <View
      style={[
        tailwind("rounded-sm py-2 bg-gray-700 w-96 "),
        styles.card,
        props.shadow && styles.shadow,
        props.style,
      ]}>
      <View style={tailwind("pl-2")}>{props.children}</View>
    </View>
  );
}
