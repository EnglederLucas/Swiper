import React, { useState, useRef, useEffect } from "react";
import Swiper from "react-native-deck-swiper";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import ImageCard from "./ImageCard";
import {
  globalVariables,
  getHexColorWithAlpha,
  getDefaultTextStyle,
} from "../../GlobalStyles";
import IconButton from "../../components/IconButton";
import { LinearGradient } from "expo-linear-gradient";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthenticationStackParameterList } from "../../../App";
import DetailView from "./DetailView";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/Utils";
import { AppendType, TmdbService } from "../../services/TmdbService";
import { ImagePosterSize, MovieResponse } from "../../contracts/TmdbTypes";
import NavBar from "../../components/NavBar";
import { FirestoreService } from "../../services/FirestoreService";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { functions } from "./../../firebaseconfig";
import { call } from "react-native-reanimated";
import {
  FireFunctionsService,
  SwipeResult,
} from "../../services/FireFunctionsService";

export type SwipeNavigationProps = StackScreenProps<
  AuthenticationStackParameterList,
  "Swipe"
>;

export default function SwipePremade({
  navigation,
  route: {
    params: { collectionId },
  },
}: SwipeNavigationProps): JSX.Element {
  const cardSize = { height: SCREEN_HEIGHT * 0.71, width: SCREEN_WIDTH * 0.97 };

  const buttonBarHeight = 90;
  const screenHeight = Dimensions.get("window").height;

  const swiper = useRef<Swiper<unknown>>(null);
  const scrollView = useRef<ScrollView>(null);

  const [loadingMovies, setLoadingMovies] = useState(false);

  const [movieQueue, setMovieQueue] = useState<(MovieResponse & AppendType)[]>(
    []
  );

  const [movieIds, setMovieIds] = useState([]);

  const [currentMovie, setCurrentMovie] = useState<
    (MovieResponse & AppendType) | null
  >();

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    console.log("Fetching Collections");

    if (!collectionId) return;

    // console.log("CollectionId", collectionId);

    // console.log(loadingMovies);
    // console.log(movieQueue);

    init().then(res => {
      if (isMounted) {
        setMovieIds(res.movieIdList);
        setMovieQueue(res.fetchedMovies);
        setCurrentMovie(res.fetchedMovies[cardIndex]);
      }
    });
    console.log("My Collection Id", collectionId);

    return () => {
      // swiper?.current.forceUpdate();
      // setCardIndex(0);
      // setCurrentMovie(null);
      isMounted = false;
    };
  }, [collectionId]);

  async function init(): Promise<{
    movieIdList: number[];
    fetchedMovies: (MovieResponse & AppendType)[];
  }> {
    setLoadingMovies(true);
    const service = TmdbService.getInstance();
    const firestore = FirestoreService.getInstance();

    const movies = await firestore.getMovieListOfCollection(collectionId);

    const fetchedMovies = await Promise.all(
      movies.map(movieId =>
        service.fetchMovieWithAppend(movieId, "videos", "credits")
      )
    );

    setLoadingMovies(false);
    return { movieIdList: movies, fetchedMovies: fetchedMovies };
  }

  const [state, setState] = useState({
    swipedAllCards: false,
    swipeDirection: "",
  });

  const [cardIndex, setCardIndex] = useState(0);

  const onSwiped = (type: SwipeResult) => {
    setCardIndex(cardIndex + 1);
    // setTimeout(() => setCurrentMovie(movieQueue[cardIndex + 1]), 250);

    console.log(type);
    const functions = FireFunctionsService.getInstance();
    functions
      .sendSwipeResult(collectionId, currentMovie?.id, type)
      .then(res => {
        if (res) alert("It's a Match!");
      })
      .catch(() => console.log("Request Failed"));

    setCurrentMovie(movieQueue[cardIndex + 1]);

    console.log("movieIdList", movieIds.splice(0, 10), "cardIndex", cardIndex);
  };

  const onSwipedAllCards = () => {
    setState(s => ({
      ...s,
      swipedAllCards: true,
    }));
  };

  function resetView(): void {
    scrollView?.current?.scrollTo({ x: 0, y: 0, animated: true });
  }

  const swipeLeft = () => {
    resetView();
    setTimeout(() => swiper?.current?.swipeLeft(), 500);
  };

  const swipeRight = () => {
    // swiper.current?.swipeRight();
    resetView();
    setTimeout(() => swiper?.current?.swipeRight(), 500);
  };

  const swipeUp = (): void => {
    // swiper.current?.swipeTop();
    resetView();
    setTimeout(() => swiper?.current?.swipeTop(), 500);
  };

  const scrollToDetails = () => {
    scrollView?.current?.scrollTo({
      x: 0,
      y: screenHeight,
      animated: true,
    });
  };

  const ButtonBarWithLinearGradient = ({
    gradientBlur = 0.25,
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

  function renderCard(movie: MovieResponse): JSX.Element {
    return (
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <ImageCard
          style={{ width: cardSize.width, height: cardSize.height }}
          source={TmdbService.getImageSource<ImagePosterSize>(
            movie?.poster_path,
            "w780"
          )}
          title={movie?.title}
          onPressText={() => scrollToDetails()}
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
          icon={require("./../../../assets/iconsPng/Icons/NoCross.png")}
          onClick={swipeLeft}></IconButton>
        <IconButton
          key="star"
          size={buttonBarHeight / 2}
          iconFactor={0.5}
          iconStyle={{ marginBottom: 2 }}
          icon={require("./../../../assets/iconsPng/Icons/Star.png")}
          onClick={swipeUp}></IconButton>
        <IconButton
          key="heart"
          size={(buttonBarHeight * 2) / 3}
          style={{ margin: 15 }}
          iconFactor={0.5}
          icon={require("./../../../assets/iconsPng/Icons/Heart.png")}
          iconStyle={{ marginTop: 4 }}
          onClick={swipeRight}></IconButton>
        {/* <Image source={require("./../../../assets/iconsPng/Icons/Heart.png")}></Image> */}
      </>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {loadingMovies && (
          <View key="spinner" style={styles.spinnerOverlay}>
            <ActivityIndicator
              style={styles.centerItem}
              size={50}
              color={globalVariables.primaryOne}
            />
          </View>
        )}
        {!collectionId && (
          <TouchableWithoutFeedback
            key="spinner"
            containerStyle={styles.spinnerOverlay}
            onPress={() => navigation.navigate("SwipeCollections")}>
            <Text
              style={[
                getDefaultTextStyle(20, 500),
                {
                  width: SCREEN_WIDTH / 2,
                  textAlign: "center",
                },
                styles.centerItem,
              ]}>
              Select a collection to start Swiping!
            </Text>
          </TouchableWithoutFeedback>
        )}
        <ScrollView
          ref={scrollView}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="normal"
          disableScrollViewPanResponder
          snapToOffsets={[screenHeight]}
          snapToStart={true}
          snapToEnd={false}
          indicatorStyle={"white"}>
          <NavBar></NavBar>

          <View
            style={{
              height: SCREEN_HEIGHT - globalVariables.navBarHeight * 1.5,
            }}>
            <View style={[styles.swipeContainer]}>
              <Swiper
                ref={swiper}
                disableBottomSwipe
                containerStyle={{
                  backgroundColor: globalVariables.darkBackgroundSwipeView,
                }}
                cardStyle={{ height: cardSize.height }}
                onSwipedLeft={() => onSwiped("nope")}
                onSwipedRight={() => onSwiped("like")}
                onSwipedTop={() => onSwiped("superLike")}
                horizontalThreshold={SCREEN_WIDTH / 6}
                // onSwipedBottom={() => this.onSwiped("bottom")}
                // onTapCard={() =>
                //   scrollView?.current?.scrollTo({
                //     x: 0,
                //     y: screenHeight,
                //     animated: true,
                //   })
                // }
                // onTapCardDeadZone={}
                cards={movieQueue}
                cardIndex={cardIndex}
                cardVerticalMargin={125}
                renderCard={renderCard}
                onSwipedAll={onSwipedAllCards}
                // inputRotationRange
                outputRotationRange={["-20deg", "0deg", "20deg"]}
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
                          source={require("./../../../assets/iconsPng/Icons/NOPETag.png")}></Image>
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
                          source={require("./../../../assets/iconsPng/Icons/LIKETag.png")}></Image>
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
                          source={require("./../../../assets/iconsPng/Icons/SUPERLIKETag.png")}></Image>
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
              movie={currentMovie}
              marginTop={40}
              buttonBarHeight={buttonBarHeight}></DetailView>
          </View>
        </ScrollView>

        <ButtonBarWithLinearGradient></ButtonBarWithLinearGradient>
      </View>
    </>
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
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  swipeContainer: {
    position: "relative",
    backgroundColor: "transparent",
    transform: [{ translateY: -globalVariables.navBarHeight - 20 }],
    flex: 1.25,
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
  centerItem: {
    paddingTop: 50,
    transform: [{ translateY: -50 }],
  },
  spinnerOverlay: {
    position: "absolute",
    zIndex: 100000,
    // width: SCREEN_WIDTH,
    width: "100%",
    height: "100%",
    // height: SCREEN_HEIGHT - globalVariables.realNavBarHeight - 8,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
