import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({});

export const globalVariables = {
  dark: "#1B1B1B",
  darkBackground: "#1B1B1B",
  darkBackgroundSwipeView: "#1F2022",
  light: "#fff",
  primaryOne: "#FD287C",
  primaryTwo: "#FF7655",
  montserrat400Regular: "Montserrat_400Regular",
  montserrat300Light: "Montserrat_300Light",
  montserrat500Medium: "Montserrat_500Medium",
  montserrat600SemiBold: "Montserrat_600SemiBold",
};

export function getHexColorWithAlpha(
  hexColor: string,
  alphaInPercent: number
): string {
  const zeroPad = (num: string, places: number) => num.padStart(places, "0");

  console.log(hexColor + (alphaInPercent / (100 / 255)).toString(16));
  return (
    hexColor + zeroPad(Math.round(alphaInPercent / (100 / 255)).toString(16), 2)
  );
}
