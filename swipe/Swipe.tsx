import React from "react"
import { View, StyleSheet, Text } from "react-native"
import IconButton from "../components/IconButton"
import { globalVariables } from "../GlobalStyles"
import ImageCard from "./ImageCard"
const image = {
  uri:
    "https://image.tmdb.org/t/p/w600_and_h900_bestv2/7uJYadq29ZfZojh8YycsvQbY9y5.jpg",
}
// import Cross from "../assets/icons/Back.svg"
// import { CrossIcon } from "../components/SvgIcons"

export default function Swipe(): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Text>Navbar</Text>
      </View>
      <ImageCard
        style={styles.imageCard}
        source={image}
        title="Star Wars"
      ></ImageCard>
      <View style={styles.buttonBar}>
        <IconButton
          size={60}
          style={{ margin: 15 }}
          icon={require("./../assets/iconsPng/Icons/NoCross.png")}
        ></IconButton>
        <IconButton
          size={50}
          iconFactor={0.5}
          iconStyle={{ marginBottom: 2 }}
          icon={require("./../assets/iconsPng/Icons/Star.png")}
        ></IconButton>
        <IconButton
          size={60}
          style={{ margin: 15 }}
          iconFactor={0.45}
          icon={require("./../assets/iconsPng/Icons/Heart.png")}
          iconStyle={{ marginTop: 2 }}
        ></IconButton>
        {/* <CrossIcon></CrossIcon> */}
        {/* <Cross></Cross> */}
        {/* <IconButton size={50}></IconButton>
        <IconButton size={60} style={{ margin: 15 }}></IconButton> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 3,
    backgroundColor: globalVariables.darkBackground2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageCard: {
    // width: "90%",
    // height: "80%",
    width: 505 / 1.32,
    height: 758 / 1.32,
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
})
