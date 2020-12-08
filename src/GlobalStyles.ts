import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({});

export const globalVariables = {
  dark: "#000000",
  darkBackground: "#1B1B1B",
  darkBackgroundSwipeView: "#1F2022",
  light: "#ffffff",
  primaryOne: "#FD287C",
  primaryTwo: "#FF7655",
  // primaryOne: "#6B75FF",
  // primaryTwo: "#AC6AFF",
  // primaryOneDark: "#7074FF",
  grey: "#2A2D32",
  montserrat400Regular: "Montserrat_400Regular",
  montserrat300Light: "Montserrat_300Light",
  montserrat500Medium: "Montserrat_500Medium",
  montserrat600SemiBold: "Montserrat_600SemiBold",
  montserrat200ExtraLight: "Montserrat_200ExtraLight",
  navBarHeight: 90,
  notificationBarHeight: 30,
  textMarginLeft: 20,
};

export function getHexColorWithAlpha(
  hexColor: string,
  alphaInPercent: number
): string {
  const zeroPad = (num: string, places: number) => num.padStart(places, "0");

  return (
    hexColor + zeroPad(Math.round(alphaInPercent / (100 / 255)).toString(16), 2)
  );
}
