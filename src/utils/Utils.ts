import { Dimensions } from "react-native";
import { NumberArray } from "react-native-svg";
export const WINDOW_WIDTH = Dimensions.get("window").width;
export const WINDOW_HEIGHT = Dimensions.get("window").height;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
export const SCREEN_WIDTH = Dimensions.get("screen").width;

export const nameof = <T>(name: keyof T): string | number | symbol => name;

export const scaleFontsize = (
  text: string,
  defaultSize: number,
  threshold: number,
  rate: number
): number => {
  return (
    defaultSize -
    Math.max((text?.length ?? threshold) - threshold, 0) / (9 / rate)
  );
};
