import React from "react";
import { View, Text, StyleProp, ViewStyle, Image } from "react-native";
import {
  ImagePosterSize,
  MovieItem,
  SearchResult,
} from "../contracts/TmdbTypes";
import { globalVariables } from "../GlobalStyles";
import { TmdbService } from "../services/TmdbService";
import * as Animatable from "react-native-animatable";
import { SCREEN_WIDTH } from "../utils/Utils";
import PressableText from "./PressableText";
import { useNavigation } from "@react-navigation/native";
import { tailwind } from "./../../tailwind";
import CardWrapper from "./CardWrapper";

type SearchResultCardProps = {
  result: MovieItem; //Search Result
  height: 125 | 150 | 200 | 250;
  marginTop?: number;
  imagePadding?: number;
  border?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  alignMode?: "left" | "center";
  style?: StyleProp<ViewStyle>;
  selectMovie: (movie: MovieItem) => void;
  padding?: number;
};

export default function SearchResultCard({
  result: item,
  height = 150,
  border = false,
  borderColor = globalVariables.grey,
  alignMode = "left",
  ...props
}: SearchResultCardProps): JSX.Element {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <CardWrapper
        style={[{ width: "95%" }, props.style]}
        onLongPress={() => props.selectMovie(item)}
        onPress={() => console.log("JOJO")}
        padding={props.padding}
        marginTop={props.marginTop}
        backgroundColor={props.backgroundColor ?? "#212121"}
        shadow={true}
        borderRadius={5}>
        <View
          style={[
            // { borderColor: "blue", borderWidth: 2 },
            { height: height, width: "100%" },
            tailwind("flex-row items-center"),
            props.style,
          ]}>
          {item.backdrop_path ? (
            <Image
              style={{
                padding: height === 250 ? 20 : 0,
                margin: height === 250 ? 10 : 0,
                borderRadius: 3,
                resizeMode: "cover", //or contain?
                width:
                  TmdbService.getBackdropDimensions({
                    height: height,
                  }).width + 10,
                height: height,
              }}
              source={TmdbService.getImageSource<ImagePosterSize>(
                item?.poster_path,
                "w185"
              )}></Image>
          ) : (
            <View
              style={{
                padding: height === 250 ? 20 : 0,
                margin: height === 250 ? 10 : 0,
                borderRadius: 3,
                width: TmdbService.getBackdropDimensions({
                  height: height,
                }).width,
                height: height,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text
                style={tailwind(
                  "text-sm text-white opacity-70 font-montserrat-300 text-center"
                )}>
                No Picture
              </Text>
            </View>
          )}
          <View
            style={[
              // { borderColor: "green", borderWidth: 2 },
              tailwind(
                "h-full flex-grow flex-col justify-between ml-text relative mr-1"
              ),
              border && {
                borderColor: borderColor,
                borderWidth: 2,
                padding: 15,
                borderRadius: 4,
              },
            ]}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  tailwind("flex-1 font-montserrat-600 text-white flex-shrink"),
                  {
                    fontSize:
                      25 - Math.max((item?.title?.length ?? 30) - 30, 0) / 2,
                  },
                ]}>
                {item?.title}
              </Text>
            </View>

            {/* <View style={alignMode === "center" && { alignItems: "center" }}>
          <Text
            style={{
              fontSize: 12,
              color: globalVariables.light,
              fontFamily: globalVariables.montserrat300Light,
            }}>
            Directed By
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: globalVariables.light,
              fontFamily: globalVariables.montserrat500Medium,
            }}>
            {item?.credits?.crew?.find(c => c.job == "Director")?.name ??
              item?.credits?.crew?.find(c => c.job.includes("Director"))?.name}
          </Text>
        </View> */}

            <View style={tailwind("flex-row justify-between")}>
              <Text style={tailwind("text-xl text-white font-montserrat-200")}>
                {new Date(item?.release_date)?.getFullYear()?.toString()}
              </Text>
              <Text style={tailwind("text-xl text-white font-montserrat-200")}>
                {`${item?.vote_average?.toString()}⭐`}
              </Text>
            </View>
          </View>
        </View>
      </CardWrapper>
    </View>
  );
}
