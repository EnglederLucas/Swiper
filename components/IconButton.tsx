import * as React from "react"
import {
  View,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
} from "react-native"
import { globalVariables } from "../GlobalStyles"

interface IconButtonProps {
  size?: number
  style?: StyleProp<ViewStyle>
  icon: ImageSourcePropType
  iconFactor?: number
  iconStyle?: StyleProp<ImageStyle>
  onClick?: (e: Event) => void
}

const IconButton = ({
  size = 50,
  iconFactor = 0.38,
  ...props
}: IconButtonProps): JSX.Element => {
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: globalVariables.dark,
      borderWidth: 2,
      borderColor: "#222325",
      borderStyle: "solid",
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      height: size * iconFactor,
      width: size * iconFactor,
      resizeMode: "contain",
    },
  })

  return (
    <View style={[props.style, styles.container]}>
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <Image
          source={props.icon}
          style={[props.iconStyle, styles.image]}
        ></Image>
      </View>
    </View>
  )
}

export default IconButton
