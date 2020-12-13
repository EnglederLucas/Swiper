import { StyleProp, StyleSheet, TextStyle } from "react-native";

export const globalStyles = StyleSheet.create({
  centerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const globalVariables = {
  dark: "#000000",
  darkBackground: "#1B1B1B",
  darkBackgroundSwipeView: "#1F2022",
  light: "#ffffff",
  // primaryOne: "#FD287C",
  // primaryTwo: "#FF7655",
  primaryOne: "#6B75FF",
  primaryTwo: "#AC6AFF",
  primaryOneDark: "#7074FF",
  grey: "#2A2D32",
  montserrat400Regular: "Montserrat_400Regular",
  montserrat300Light: "Montserrat_300Light",
  montserrat500Medium: "Montserrat_500Medium",
  montserrat600SemiBold: "Montserrat_600SemiBold",
  montserrat200ExtraLight: "Montserrat_200ExtraLight",
  navBarHeight: 90,
  realNavBarHeight: 90 * 1.5,
  notificationBarHeight: 30,
  textMarginLeft: 20,
};

type FontWeight = 200 | 300 | 400 | 500 | 600;

function getFontWithWeight(weight?: FontWeight): string {
  if (!weight) {
    return globalVariables.montserrat400Regular;
  }

  switch (weight) {
    case 200:
      return globalVariables.montserrat200ExtraLight;
    case 300:
      return globalVariables.montserrat300Light;
    case 400:
      return globalVariables.montserrat400Regular;
    case 500:
      return globalVariables.montserrat500Medium;
    case 600:
      return globalVariables.montserrat600SemiBold;
  }

  return globalVariables.montserrat400Regular;
}

export function getHexColorWithAlpha(
  hexColor: string,
  alphaInPercent: number
): string {
  const zeroPad = (num: string, places: number) => num.padStart(places, "0");

  return (
    hexColor + zeroPad(Math.round(alphaInPercent / (100 / 255)).toString(16), 2)
  );
}

export function getDefaultTextStyle(
  fontSize: number,
  weight?: FontWeight
): StyleProp<TextStyle> {
  return {
    color: globalVariables.light,
    fontSize: fontSize,
    fontFamily: getFontWithWeight(weight),
  };
}
