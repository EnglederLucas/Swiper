import * as React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  ImageBackground,
} from "react-native";
import { globalVariables } from "../GlobalStyles";
import { 
  useTapGestureHandler,
  withTransition,
  mix,
} from "react-native-redash/lib/module/v1";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Animated, {
  call,
  cond,
  eq,
  useCode,
  Value,
} from "react-native-reanimated";

interface IconButtonProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
  icon: ImageSourcePropType;
  iconFactor?: number;
  iconStyle?: StyleProp<ImageStyle>;
  onClick?: () => void;
}

const IconButton = ({
  iconFactor = 0.38,
  size = 50,
  ...props
}: IconButtonProps): JSX.Element => {
  const { gestureHandler, state } = useTapGestureHandler();
  useCode(
    () =>
      cond(
        eq(state, State.END),
        call([], () => props.onClick())
      ),
    [state]
  );

  const active = new Value(-1);

  const progress = withTransition(eq(state, State.BEGAN));
  const scale = mix(progress, 1, 0.5);

  const styles = StyleSheet.create({
    buttonContainer: {
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
  });

  return (
    <>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.buttonContainer,
            props.style,
            { transform: [{ scale: scale }] },
          ]}>
          <Animated.Image style={styles.image} source={props.icon} />
        </Animated.View>
      </TapGestureHandler>
    </>
  );
};

export default IconButton;
