import React from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from "react-native";
import { getHexColorWithAlpha, globalVariables } from "../GlobalStyles";

type PersonCardProps = {
  borderRadius?: number;
  name: string;
  role: string;
  profile: ImageSourcePropType;
  size?: number;
  imageSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  fontSize?: number;
  marginTopBottom?: number;
  marginLeft?: number;
};

export default function PersonCard({
  size = 65,
  imageSize = size - 10,
  borderRadius = 10,
  fontSize = 13,
  marginTopBottom = 10,
  marginLeft = 7,
  ...props
}: PersonCardProps): JSX.Element {
  return (
    <View
      style={[
        {
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          marginLeft: marginLeft,

          marginTop: marginTopBottom,
          marginBottom: marginTopBottom,
        },
        props.containerStyle,
      ]}>
      {props.profile ? (
        <Image
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: borderRadius,
            resizeMode: "cover",
          }}
          source={props.profile}></Image>
      ) : (
        <></>
      )}
      {!props.profile ? (
        <View
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: borderRadius,
            backgroundColor: globalVariables.grey,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: globalVariables.montserrat500Medium,
              color: getHexColorWithAlpha(globalVariables.light, 30),
            }}>
            {props.name
              .split(" ")
              .map(w => w[0])
              .join("")}
          </Text>
        </View>
      ) : (
        <></>
      )}
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
          width: size,
        }}>
        <Text
          style={{
            fontSize: fontSize,
            color: getHexColorWithAlpha(globalVariables.light, 60),
            fontFamily: globalVariables.montserrat400Regular,
            textAlign: "center",
          }}>
          {props.name}
        </Text>
        <Text
          style={{
            fontSize: fontSize - 2,
            color: getHexColorWithAlpha(globalVariables.light, 45),
            fontFamily: globalVariables.montserrat300Light,
            textAlign: "center",
          }}>
          {props.role}
        </Text>
      </View>
    </View>
  );
}
