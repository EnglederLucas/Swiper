import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { globalVariables, getHexColorWithAlpha } from "../GlobalStyles";

type BottomSheetHeaderProps = {
  height?: 50 | number;
};

function BottomSheetHeader({
  height = 50,
  ...props
}: BottomSheetHeaderProps): JSX.Element {
  return (
    <View
      style={{
        backgroundColor: globalVariables.dark,
        height: height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }}>
      <View
        style={{
          backgroundColor: getHexColorWithAlpha(globalVariables.light, 70),
          borderRadius: 10,
          height: 5,
          width: 50,
        }}></View>
    </View>
  );
}

export default BottomSheetHeader;
