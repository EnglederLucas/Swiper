import React, { useState, useRef, useEffect } from "react";
import Swiper from "react-native-deck-swiper";
import {
  StyleSheet,
  View,
  ImageSourcePropType,
  ScrollView,
  Text,
  Image,
  Dimensions,
} from "react-native";
import ImageCard from "./ImageCard";
import { globalVariables, getHexColorWithAlpha } from "../GlobalStyles";
import IconButton from "../components/IconButton";
import { LinearGradient } from "expo-linear-gradient";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthenticationStackParameterList } from "./../../App";
import DetailView from "./DetailView";
import { WINDOW_HEIGHT } from "../utils/Utils";
import { AppendType, TmdbService } from "../services/TmdbService";
import { ImagePosterSize, MovieResponse } from "../contracts/TmdbTypes";

type NavigationProps = StackScreenProps<
  AuthenticationStackParameterList,
  "Swipe"
>;

const oldDemoCards: {
  title: string;
  description?: string;
  source: ImageSourcePropType;
}[] = [
  {
    title: "Ranzler",
    description: "Schau mi an und Schau di an",
    source: {
      uri: "https://i.gyazo.com/8ee7f571367d9908283daa5854fadf63.jpg",
    },
  },
  {
    title: "Da Wirth",
    source: {
      uri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ10O6iFJr8WwFxj-RsWgYxWxY9WQOxS6UsVA&usqp=CAU",
    },
  },
  {
    title: "Janus",
    source: {
      uri: "https://i.gyazo.com/ed2724cf2e7fd5f9140598b30cda84ae.jpg",
    },
  },
  {
    title: "Kevin",
    source: {
      uri: "https://i.gyazo.com/5ab9ad7c8536d55ad3caf981086826d9.jpg",
    },
  },
  {
    title: "Bernhard Lehner",
    description: "This guy fucks!",
    source: {
      uri: "https://i.gyazo.com/3a5d7fa4e52cec3502f148ba84cc1ad4.png",
    },
  },
  {
    title: "Daniel uWu",
    source: {
      uri: "https://i.gyazo.com/b1a8c8cf7ad6f1e24795439ca33e7d58.png",
    },
  },
  {
    title: "Lux",
    source: {
      uri:
        "https://i.pinimg.com/originals/3c/eb/23/3ceb23b8b41e8887289ac7c2d4bcb9a9.png",
    },
  },
  {
    title: "Hofmarcher",
    source: {
      uri:
        "https://nothalfgood.files.wordpress.com/2018/07/fly-rubbing-hands-e1531413955790.jpg?w=426",
    },
  },
  {
    title: "Chad",
    description: "Alles Gute zum Geburtstag, Alex!",
    source: {
      uri: "https://i.gyazo.com/48014a203e13dd774064bc1cdf10e944.png",
    },
  },
];

const movieIds = [19995, 597, 24428, 12445, 122, 38356, 49026, 58, 10193];

export default function SwipePremade({
  navigation,
}: NavigationProps): JSX.Element {
  const buttonBarHeight = 90;
  const screenHeight = Dimensions.get("window").height;

  const swiper = useRef<Swiper<any>>(null);
  const scrollView = useRef<ScrollView>(null);

  const [movieQueue, setMovieQueue] = useState<MovieResponse[]>([]);

  const [currentMovie, setCurrentMovie] = useState<MovieResponse>();
  const [currentMovieId, setCurrentMovieId] = useState<number>(movieIds[0]);

  useEffect(() => {
    const service = TmdbService.getInstance();
    console.log("JO");

    console.log("Joe");
    // movieIds.map(movieId =>
    //   service
    //     .fetchMovie(movieId)
    //     .then(movie => setMovieQueue(q => q.concat(movie)))
    //     .then(movie => console.log(movie))
    // );

    const fetchedMovies = Promise.all(
      movieIds.map(movieId => service.fetchMovie(movieId))
    );
    fetchedMovies.then(fM => setMovieQueue(fM));
  }, []);

  const [state, setState] = useState({
    swipedAllCards: false,
    swipeDirection: "",
  });

  const [cardIndex, setCardIndex] = useState(0);

  function renderCard(movie: MovieResponse): JSX.Element {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          justifyContent: "center",
        }}>
        <ImageCard
          style={{ height: "100%" }}
          source={TmdbService.getImageSource<ImagePosterSize>(
            movie?.poster_path,
            "w780"
          )}
          title={movie?.title}
          description={movie?.tagline}></ImageCard>
      </View>
    );
  }

  const getIconButtons = () => {
    return (
      <>
        <IconButton
          key="noCross"
          size={(buttonBarHeight * 2) / 3}
          style={{ margin: 15 }}
          icon={require("./../../assets/iconsPng/Icons/NoCross.png")}
          onClick={swipeLeft}></IconButton>
        <IconButton
          key="star"
          size={buttonBarHeight / 2}
          iconFactor={0.5}
          iconStyle={{ marginBottom: 2 }}
          icon={require("./../../assets/iconsPng/Icons/Star.png")}
          onClick={swipeUp}></IconButton>
        <IconButton
          key="heart"
          size={(buttonBarHeight * 2) / 3}
          style={{ margin: 15 }}
          iconFactor={0.45}
          icon={require("./../../assets/iconsPng/Icons/Heart.png")}
          iconStyle={{ marginTop: 3 }}
          onClick={swipeRight}></IconButton>
      </>
    );
  };

  const onSwiped = type => {
    console.log(`on swiped ${type}`);
    console.log("CardIndex", cardIndex);

    setCurrentMovie(movieQueue[cardIndex]);
    setCurrentMovieId(movieIds[cardIndex + 1]);
    setCardIndex(cardIndex + 1);
    // Returns first value
    console.log(movieQueue);
    console.log(currentMovie);
    console.log("CardIndex", cardIndex);
  };

  const onSwipedAllCards = () => {
    setState(s => ({
      ...s,
      swipedAllCards: true,
    }));
  };

  function resetView(): void {
    scrollView.current.scrollTo({ x: 0, y: 0, animated: true });
  }

  const swipeLeft = () => {
    resetView();
    setTimeout(() => swiper.current?.swipeLeft(), 500);
  };

  const swipeRight = () => {
    // swiper.current?.swipeRight();
    resetView();
    setTimeout(() => swiper.current?.swipeRight(), 500);
  };

  const swipeUp = (): void => {
    // swiper.current?.swipeTop();
    resetView();
    setTimeout(() => swiper.current?.swipeTop(), 500);
  };

  const ButtonBar = (): JSX.Element => {
    return (
      <View style={[styles.buttonBar, { height: buttonBarHeight }]}>
        {getIconButtons()}
      </View>
    );
  };

  const ButtonBarWithLinearGradient = ({
    gradientBlur = 0.25,
    ...props
  }: {
    gradientBlur?: number;
  }): JSX.Element => {
    return (
      <>
        <LinearGradient
          start={{ x: 0.5, y: 0.0 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0.0, gradientBlur + 0.15]}
          colors={[
            getHexColorWithAlpha(globalVariables.darkBackgroundSwipeView, 20),
            globalVariables.darkBackgroundSwipeView,
          ]}
          style={[
            styles.buttonBar,
            {
              width: "100%",
              marginBottom: 0,
              height: buttonBarHeight * (0.5 + gradientBlur),
            },
          ]}></LinearGradient>
        <View style={styles.buttonContainer}>{getIconButtons()}</View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollView}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
        disableScrollViewPanResponder
        snapToOffsets={[screenHeight]}
        snapToStart={true}
        snapToEnd={false}
        indicatorStyle={"white"}>
        <View
          style={{
            height: WINDOW_HEIGHT,
            // borderColor: "green",
            // borderWidth: 3,
          }}>
          <View style={styles.swipeContainer}>
            <Swiper
              ref={swiper}
              disableBottomSwipe
              containerStyle={{
                backgroundColor: globalVariables.darkBackgroundSwipeView,
              }}
              onSwipedLeft={() => onSwiped("left")}
              onSwipedRight={() => onSwiped("right")}
              onSwipedTop={() => onSwiped("top")}
              // onSwipedBottom={() => this.onSwiped("bottom")}
              onTapCard={() =>
                scrollView.current.scrollTo({
                  x: 0,
                  y: screenHeight,
                  animated: true,
                })
              }
              onTapCardDeadZone={3}
              cards={movieQueue}
              // horizontalThreshold={}
              cardIndex={cardIndex}
              cardVerticalMargin={100}
              renderCard={renderCard}
              onSwipedAll={onSwipedAllCards}
              // inputRotationRange
              //outputRotationRange
              stackSize={3}
              stackSeparation={0}
              overlayLabels={{
                bottom: {
                  title: "BLEAH",
                  style: {
                    label: {
                      borderColor: "white",
                      color: "white",
                      padding: 20,
                      backgroundColor: "rgba(255,255,255,0.8)",
                    },
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  },
                },
                left: {
                  element: (
                    <>
                      <Image
                        style={{
                          height: 175,
                          width: 175,
                          resizeMode: "contain",
                          justifyContent: "center",
                          top: 0,
                        }}
                        source={require("./../../assets/iconsPng/Icons/NOPETag.png")}></Image>
                    </>
                  ) /* Optional */,
                  title: "NOPE",
                  style: {
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      marginTop: -10,
                      marginLeft: -30,
                    },
                  },
                },
                right: {
                  element: (
                    <>
                      <Image
                        style={{
                          height: 150,
                          width: 150,
                          resizeMode: "contain",
                          justifyContent: "center",
                          top: 0,
                        }}
                        source={require("./../../assets/iconsPng/Icons/LIKETag.png")}></Image>
                    </>
                  ) /* Optional */,
                  title: "LIKE",
                  style: {
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      marginLeft: 30,
                    },
                  },
                },
                top: {
                  element: (
                    <>
                      <Image
                        style={{
                          height: 225,
                          width: 225,
                          resizeMode: "contain",
                          justifyContent: "center",
                          top: 0,
                        }}
                        source={require("./../../assets/iconsPng/Icons/SUPERLIKETag.png")}></Image>
                    </>
                  ) /* Optional */,
                  title: "Super Like",
                  style: {
                    wrapper: {
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 100,
                    },
                  },
                },
              }}
              animateOverlayLabelsOpacity
              animateCardOpacity
              swipeBackCard></Swiper>
          </View>
        </View>
        <View
          style={
            {
              // borderColor: "green",
              // borderWidth: 3,
            }
          }>
          <DetailView
            movieId={currentMovieId}
            buttonBarHeight={buttonBarHeight}></DetailView>
        </View>
      </ScrollView>
      <ButtonBarWithLinearGradient></ButtonBarWithLinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 2,
    backgroundColor: globalVariables.darkBackgroundSwipeView,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  swipeContainer: {
    // height: "92%",
    position: "relative",
    height: 900,
    flex: 1,
    marginBottom: 10,
    zIndex: 100,
  },
  scrollContainer: {
    flexDirection: "column",
    flex: 2,
  },
  scrollContent: {},
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    height: 90, //necessary?
    backgroundColor: "transparent",
    alignItems: "center",
    alignSelf: "center",
  },
  card: {
    flex: 1,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent",
  },
});
