import { useNavigation } from "@react-navigation/native";
import React, { ReactElement } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { globalVariables } from "../GlobalStyles";
import { SCREEN_WIDTH } from "../utils/Utils";

import { useRoute } from "@react-navigation/native";

interface NavButtonProps {
  name: "SwipeCollections" | "Swipe" | "Settings";
  imgSrc: ImageSourcePropType;
  onClick: () => void;
  highlight?: boolean;
  size?: number;
}

export default function NavBar(): ReactElement {
  const navigation = useNavigation();
  const route = useRoute();

  // const [selected, setSelected] = useState<
  //   "SwipeCollections" | "Swipe" | "Settings"
  // >("Swipe");

  function NavButton({
    highlight = false,
    size = 24,
    ...props
  }: NavButtonProps): JSX.Element {
    const componentClass = highlight ? TouchableHighlight : TouchableOpacity;

    return React.createElement(
      componentClass,
      {
        style: styles.navButton,
        onPress: props.onClick,
        underlayColor: globalVariables.dark,
      },
      <View
        style={[
          styles.navButton,
          route.name === props.name
            ? { backgroundColor: globalVariables.dark }
            : {},
          props.name !== "SwipeCollections"
            ? { borderBottomLeftRadius: 20 }
            : {},
          props.name !== "Settings" ? { borderBottomRightRadius: 20 } : {},
        ]}>
        <Image
          source={props.imgSrc}
          fadeDuration={0}
          style={{ width: size, height: size }}
        />
      </View>
    );
  }

  return (
    <View style={styles.navbarContainer}>
      <View
        style={{
          height: globalVariables.notificationBarHeight,
          backgroundColor: "black",
        }}></View>
      <View style={styles.buttonContainer}>
        <NavButton
          name="SwipeCollections"
          key="SwipeCollections"
          imgSrc={require("./../../assets/iconsPng/feather-icon/grid.png")}
          onClick={() => navigation.navigate("SwipeCollections")}></NavButton>
        <NavButton
          name="Swipe"
          key="Swipe"
          imgSrc={require("./../../assets/iconsPng/Icons/swiper-icon32.png")}
          onClick={() =>
            navigation.navigate("Swipe", {
              collectionId: "X8NyduiP6chSfEWljHfj",
            })
          }
          size={40}></NavButton>
        <NavButton
          name="Settings"
          key="Settings"
          imgSrc={require("./../../assets/iconsPng/feather-icon/settings.png")}
          onClick={() => navigation.navigate("Settings")}></NavButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    width: SCREEN_WIDTH,
    height: globalVariables.navBarHeight,
    backgroundColor: globalVariables.darkBackgroundSwipeView,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  buttonContainer: {
    backgroundColor: globalVariables.darkBackgroundSwipeView,

    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  text: {
    color: globalVariables.light,
    fontSize: 20,
    fontFamily: globalVariables.montserrat300Light,
  },
  navButton: {
    height: "100%",
    width: SCREEN_WIDTH / 3,
    alignItems: "center",
    justifyContent: "center",
  },
  touchable: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
