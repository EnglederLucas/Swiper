import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import {
  ImageBackground,
  StyleSheet,
  ImageSourcePropType,
  View,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native"
import { globalVariables } from "../GlobalStyles"

interface ImageCardProps {
  source: ImageSourcePropType
  title: string
  withShadow?: boolean
  withDarkGradient?: boolean
  style?: StyleProp<ViewStyle>
}

export default function ImageCard({
  withShadow = true,
  withDarkGradient = true,
  ...props
}: ImageCardProps): JSX.Element {
  const shadowStyle = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  }

  return (
    <View style={props.style}>
      <ImageBackground
        source={props.source}
        imageStyle={styles.image}
        style={[withShadow ? shadowStyle : null, styles.imageBackground]}
      >
        {withDarkGradient && (
          <LinearGradient
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 0.5, y: 1.0 }}
            colors={[
              "rgba(112, 112, 112, 0.2)",
              "rgba(34, 35, 37, 0.2)",
              "rgba(34, 35, 37, 0.4)",
              "rgba(34, 35, 37, 0.85)",
            ]}
            style={styles.darkGradient}
          ></LinearGradient>
        )}
        <View style={styles.galleryControl}></View>
        <Text style={styles.title}>{props.title}</Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#C1C1C1",
    borderRadius: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "space-between",
    borderRadius: 10,
    position: "relative",
    zIndex: -1,
  },
  image: {
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 10,
  },
  title: {
    zIndex: 100,
    color: globalVariables.light,
    fontFamily: globalVariables.montserrat600SemiBold,
    fontSize: 30,
    margin: 10,
  },
  galleryControl: {},
  darkGradient: {
    height: "100%",
    zIndex: 0,
    width: "100%",
    bottom: 0,
    position: "absolute",
    borderRadius: 10,
  },
})
