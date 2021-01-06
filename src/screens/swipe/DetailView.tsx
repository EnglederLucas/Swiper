import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native";
import { AppendType, TmdbService } from "../../services/TmdbService";
import {
  ImagePosterSize,
  ImageProfileSize,
  MovieResponse,
} from "../../contracts/TmdbTypes";
// import Image from "react-native-scalable-image";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { SCREEN_WIDTH } from "../../utils/Utils";
import { getHexColorWithAlpha, globalVariables } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";
import PersonCard from "../../components/PersonCard";
import { PersonList } from "../../components";

interface DetailViewProps {
  // movie?: MovieResponse & AppendType;
  buttonBarHeight?: number;
  marginTop?: number;
  animationGeneralInfo?: boolean;
  movie: (MovieResponse & AppendType) | null | undefined;
}

const DetailView = ({ movie, ...props }: DetailViewProps): JSX.Element => {
  const [playing, setPlaying] = useState(false);

  const youtubePlayerRef = useRef<YoutubeIframeRef>(null);

  const animatables = {
    generalInfo: useRef<Animatable.View & View>(null),
    cast: useRef<Animatable.View & View>(null),
    crew: useRef<Animatable.View & View>(null),
    rest: useRef<Animatable.View & View>(null),
  };

  useEffect(() => {
    // console.log(movie);
    // for (const key in animatables) {
    //   if (Object.prototype.hasOwnProperty.call(animatables, key)) {
    //     const element: React.MutableRefObject<Animatable.View & View> =
    //       animatables[key];
    //     // console.log("Current", element.current);
    //     element?.current?.slideInUp(1000);
    //   }
    // }
  }, [movie]);

  const onStateChange = useCallback(state => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const Description = (props: {
    alignMode: "center" | "left";
    marginLeft: number;
  }): JSX.Element => (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 25,
        paddingBottom: 5,
      }}>
      <Text
        style={{
          fontSize: 15,
          fontFamily: globalVariables.montserrat300Light,
          color: getHexColorWithAlpha(globalVariables.light, 60),
          textAlign: props.alignMode,
          marginLeft: props.marginLeft,
          marginRight: props.marginLeft,
        }}>
        {movie?.overview}
      </Text>
    </View>
  );

  const Line = (props: { color: string; borderWidth: number }) => (
    <View
      style={{
        zIndex: 200,
        borderBottomColor: props.color,
        borderBottomWidth: props.borderWidth,
      }}
    />
  );

  const GeneralInfo = ({
    height,
    border = false,
    borderColor = globalVariables.grey,
    alignMode = "left",
    includeDescription = true,
    ...props
  }: {
    height: 200 | 250;
    imagePadding?: number;
    border?: boolean;
    borderColor?: string;
    animation: boolean;
    includeDescription?: boolean;
    alignMode?: "left" | "center";
    style?: StyleProp<ViewStyle>;
  }): JSX.Element => (
    <Animatable.View
      style={[props.style]}
      ref={animatables.generalInfo}
      animation={props.animation ? "slideInUp" : ""}
      duration={1000}>
      <View style={[styles.info_wrapper, { height: height, borderRadius: 2 }]}>
        <View
          style={[
            styles.infos,
            border && {
              borderColor: borderColor,
              borderWidth: 2,
              padding: 15,
              borderRadius: 4,
            },
            { borderRadius: 4 },
          ]}>
          <Text
            style={{
              fontSize: 30 - Math.max((movie?.title?.length ?? 15) - 15, 0) / 3,
              //fontSize calculation algorithm, so long titles get scaled down, 15 characters is the threshold for scaling
              fontFamily: globalVariables.montserrat600SemiBold,
              color: globalVariables.light,
              textAlign: alignMode,
            }}>
            {movie?.title}
          </Text>

          <View style={alignMode === "center" && { alignItems: "center" }}>
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
              {movie?.credits?.crew?.find(c => c.job == "Director")?.name ??
                movie?.credits?.crew?.find(c => c.job.includes("Director"))
                  ?.name}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text
              style={{
                fontSize: 20,
                color: globalVariables.light,
                fontFamily: globalVariables.montserrat200ExtraLight,
              }}>
              {new Date(movie?.release_date)?.getFullYear()?.toString()}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: globalVariables.light,
                fontFamily: globalVariables.montserrat200ExtraLight,
                marginRight: 10,
              }}>
              {`${movie?.runtime?.toString()}m`}
            </Text>
          </View>
        </View>

        <Image
          style={{
            padding: height === 250 ? 20 : 0,
            margin: height === 250 ? 10 : 0,
            // marginRight: height === 200 ? 10 : 0,

            flex: 1,
            borderRadius: 2,
            resizeMode: "contain",

            width: TmdbService.getBackdropDimensions({
              height: height,
            }).width,
            height: height,
          }}
          source={TmdbService.getImageSource<ImagePosterSize>(
            movie?.poster_path,
            "w185"
          )}></Image>
      </View>
      {includeDescription && (
        <Description
          alignMode={alignMode}
          marginLeft={globalVariables.textMarginLeft}></Description>
      )}
    </Animatable.View>
  );

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: props.marginTop, //To correct the inconsisten screenHeight shit
        }}>
        <GeneralInfo
          key="generalInfo"
          animation={props.animationGeneralInfo}
          height={200}
          alignMode={"left"}
          includeDescription={true}></GeneralInfo>
        <Line color={globalVariables.grey} borderWidth={2}></Line>
        <PersonList
          title={"Cast"}
          containerStyle={{ marginTop: 15 }}
          border={"none"}
          animationOptions={{
            animationRef: animatables.cast,
            animation: "slideInLeft",
            duration: 1000,
          }}>
          <>
            {movie?.credits?.cast.slice(0, 15).map(c => (
              <PersonCard
                name={c.name}
                role={c.character}
                profile={TmdbService.getImageSource<ImageProfileSize>(
                  c.profile_path,
                  "w185"
                )}
                key={c.credit_id}
                size={70}
                marginTopBottom={15}
                marginLeft={5}
                borderRadius={10}></PersonCard>
            ))}
          </>
        </PersonList>

        <PersonList
          title={"Crew"}
          border={"none"}
          height={220}
          animationOptions={{
            animationRef: animatables.crew,
            animation: "slideInUp",
            duration: 1000,
          }}>
          <>
            {TmdbService.getOrderedCrewWithGroupedJobs(
              movie?.credits?.crew,
              15
            ).map(c => (
              <PersonCard
                name={c.name}
                role={c.job}
                profile={TmdbService.getImageSource<ImageProfileSize>(
                  c.profile_path,
                  "w185"
                )}
                key={c.credit_id}
                size={70}
                marginTopBottom={15}
                marginLeft={5}
                borderRadius={10}></PersonCard>
            ))}
          </>
        </PersonList>

        <View>
          <YoutubePlayer
            ref={youtubePlayerRef}
            initialPlayerParams={{}}
            webViewStyle={{}}
            height={250}
            width={400}
            play={playing}
            videoId={TmdbService.extractYoutubeTrailerKey(movie)}
            onChangeState={onStateChange}
          />
        </View>
        <View style={{ height: props.buttonBarHeight ?? 80 }}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop_image: {},
  info_wrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    // flexShrink: 2,
  },
  infos: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: globalVariables.textMarginLeft,
  },
  poster_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DetailView;
