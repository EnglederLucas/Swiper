import React from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
  ScrollView,
  TextStyle,
  ImageStyle,
} from "react-native";
import { getHexColorWithAlpha, globalVariables } from "../GlobalStyles";
import * as Animatable from "react-native-animatable";
import { SCREEN_WIDTH } from "../utils/Utils";

type PersonListProps = {
  marginTop?: number;
  animationOptions?: Omit<Animatable.AnimatableProperties<View>, "ref"> & {
    animationRef: React.MutableRefObject<Animatable.View & View>;
  };
  title: string;
  children: JSX.Element;
  borderWidth?: number;
  height?: number;
  border?: "bottom" | "top" | "none";
  containerStyle?: StyleProp<ViewStyle>;
};

export default function PersonList({
  height = 200,
  border = "top",
  borderWidth = 1,
  ...props
}: PersonListProps): JSX.Element {
  return (
    <Animatable.View
      ref={props.animationOptions?.animationRef}
      animation={props.animationOptions?.animation}
      duration={props.animationOptions?.duration}
      delay={props.animationOptions?.delay}
      direction={props.animationOptions?.direction}
      easing={props.animationOptions?.easing}
      // {...props.an}
      style={[
        {
          position: "relative",
          padding: 20,
          width: "100%",
          height: height,
          alignItems: "center",
          justifyContent: "center",
        },
        border === "bottom" && {
          borderTopColor: getHexColorWithAlpha(globalVariables.light, 20),
          borderWidth,
        },
        border === "top"
          ? {
              borderTopColor: getHexColorWithAlpha(globalVariables.light, 100),
              borderWidth,
            }
          : {},
        props.containerStyle,
      ]}>
      <View style={{ position: "absolute", left: 0, top: 0 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: globalVariables.montserrat400Regular,
            color: getHexColorWithAlpha(globalVariables.light, 20),
            marginLeft: globalVariables.textMarginLeft,
          }}>
          {props.title}
        </Text>

        <ScrollView
          style={{
            paddingLeft: 10,
            width: SCREEN_WIDTH,
            zIndex: -3,
          }}
          nestedScrollEnabled={true}
          contentContainerStyle={{ paddingRight: 30 }}
          decelerationRate="normal"
          snapToOffsets={[0]}
          snapToStart={false}
          snapToEnd={false}
          horizontal={true}
          indicatorStyle={"white"}>
          {props.children}
        </ScrollView>
      </View>
    </Animatable.View>
  );
}
