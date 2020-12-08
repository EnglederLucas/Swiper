import React from "react";
import { View, StyleSheet, Text, ImageSourcePropType } from "react-native";
import IconButton from "../../components/IconButton";
import { globalVariables } from "../../GlobalStyles";
import ImageCard from "./ImageCard";
import Swiper from "react-native-deck-swiper";
// import { Interactable } from "react-native-redash/lib/module/v1"

const demoCards: { title: string; source: ImageSourcePropType }[] = [
  {
    title: "Star Wars",
    source: {
      uri:
        "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7uJYadq29ZfZojh8YycsvQbY9y5.jpg",
    },
  },
  {
    title: "Teenage Bounty Hunters",
    source: {
      uri: "https://image.tmdb.org/t/p/w1280/gFtJaWcLAJJsSzfuWcLSeAS8aVl.jpg",
    },
  },
  {
    title: "Titanic",
    source: {
      uri: "https://image.tmdb.org/t/p/w1280/AsvlvNiSmCYDWuedlAAVRzNDzPv.jpg",
    },
  },
];

export default function Swipe(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text>Navbar</Text>
      </View>

      <Swiper
        containerStyle={{ height: "20%" }}
        cardStyle={styles.imageCard}
        cards={demoCards}
        renderCard={ImageCard}></Swiper>

      <View style={styles.buttonBar}>
        <IconButton
          size={60}
          style={{ margin: 15 }}
          icon={require("./../../assets/iconsPng/Icons/NoCross.png")}></IconButton>
        <IconButton
          size={45}
          iconFactor={0.5}
          iconStyle={{ marginBottom: 2 }}
          icon={require("./../../assets/iconsPng/Icons/Star.png")}></IconButton>
        <IconButton
          size={60}
          style={{ margin: 15 }}
          iconFactor={0.45}
          icon={require("./../../assets/iconsPng/Icons/Heart.png")}
          iconStyle={{ marginTop: 3 }}></IconButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 3,
    backgroundColor: globalVariables.darkBackgroundSwipeView,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageCard: {
    width: "90%",
    // height: "80%",

    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    // borderColor: "#E8E8E8",
    justifyContent: "center",
  },
  buttonBar: {
    height: "5%",
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navBar: {
    height: "10%",
  },
});
