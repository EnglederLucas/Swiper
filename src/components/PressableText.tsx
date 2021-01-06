import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";
import { JsxAST } from "react-native-svg";

export type PressableTextProps = {
  onPress: () => void;
  onLongPress?: () => void;
  padding?: number;
  wrapperStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  children?: JSX.Element;
};

export default function PressableText(props: PressableTextProps): JSX.Element {
  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}
      onLongPress={props.onLongPress}>
      <View style={[{ padding: props.padding }, props.wrapperStyle]}>
        {props.text && <Text style={[props.textStyle]}>{props.text}</Text>}
        {!props.text && props.children && { ...props.children }}
      </View>
    </TouchableWithoutFeedback>
  );
}
