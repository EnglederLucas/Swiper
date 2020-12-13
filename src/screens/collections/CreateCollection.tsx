import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { SimpleTextInput, SwiperButton } from "../../components";
import {
  getDefaultTextStyle,
  getHexColorWithAlpha,
  globalVariables,
} from "../../GlobalStyles";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/Utils";
import * as Animatable from "react-native-animatable";

type CreateCollectionProps = {
  onCancel: () => void;
};

export default function CreateCollection(
  props: CreateCollectionProps
): JSX.Element {
  const [collectionName, setCollectionName] = useState("");
  const [plannedDate, setPlannedDate] = useState(Date.now());

  const [addMoviesVisible, setAddMoviesVisible] = useState(false);

  const modalClose = useRef<any>(null);

  function createNewCollection() {
    return;
  }

  function AddMoviesModal(): JSX.Element {
    return (
      <Modal
        animationType="slide"
        style={{ height: SCREEN_HEIGHT, backgroundColor: globalVariables.dark }}
        transparent={true}
        statusBarTranslucent={true}
        presentationStyle={"overFullScreen"}
        visible={addMoviesVisible}>
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: globalVariables.darkBackgroundSwipeView,
            // backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}>
          <View
            style={{
              height: globalVariables.navBarHeight,
              justifyContent: "flex-end",
              flexDirection: "row",
              // padding: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                modalClose?.current?.rotate();
                setAddMoviesVisible(false);
              }}>
              <View style={{ padding: 20 }}>
                <Animatable.Image
                  ref={modalClose}
                  animation={"rotate"}
                  direction={"alternate"}
                  duration={750}
                  easing={"ease-out-quad"}
                  source={require("./../../../assets/iconsPng/feather-icon/x128.png")}
                  fadeDuration={0}
                  style={{ width: 32, height: 32 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View>
      <View
        style={{
          // borderColor: "red",
          // borderWidth: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
        }}>
        <View
          style={{
            // borderColor: "green",
            // borderWidth: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "90%",
            marginLeft: "8%",
          }}>
          <Text style={[getDefaultTextStyle(24, 500), { marginBottom: 35 }]}>
            Create Collection!
          </Text>
          <View>
            <SimpleTextInput
              width={260}
              height={50}
              value={collectionName}
              placeholder="Name"
              onChangeText={text => setCollectionName(text)}></SimpleTextInput>
          </View>
        </View>

        <View
          style={{
            // borderColor: getHexColorWithAlpha(globalVariables.light, 30),
            borderRadius: 5,
            borderWidth: 2,
            width: "85%",
            // alignSelf: "center",
            marginLeft: "8%",
          }}>
          <TouchableHighlight
            underlayColor={getHexColorWithAlpha(globalVariables.light, 0.3)}
            onPress={() => setAddMoviesVisible(true)}>
            <View
              style={{
                borderColor: getHexColorWithAlpha(globalVariables.light, 90),
                borderRadius: 5,

                backgroundColor: globalVariables.darkBackgroundSwipeView,
                padding: 35,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
              }}>
              <Text
                style={[
                  getDefaultTextStyle(20, 300),
                  {
                    // textTransform: "uppercase",
                    color: getHexColorWithAlpha(globalVariables.light, 90),
                    marginRight: 50,
                  },
                ]}>
                Add Movies
              </Text>
              <Animatable.Image
                animation={"rubberBand"}
                duration={500}
                iterationDelay={2000}
                iterationCount={"infinite"}
                easing={"ease-out-quad"}
                source={require("./../../../assets/iconsPng/feather-icon/chevron-right.png")}
                fadeDuration={0}
                style={{ width: 32, height: 32 }}
              />
            </View>
          </TouchableHighlight>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            // borderColor: "red",
            paddingBottom: 10,
          }}>
          <TouchableOpacity onPress={() => props.onCancel()}>
            <Text
              style={[
                getDefaultTextStyle(20, 300),
                {
                  textTransform: "uppercase",
                  color: getHexColorWithAlpha(globalVariables.light, 50),
                  marginRight: 50,
                },
              ]}>
              CANCEL
            </Text>
          </TouchableOpacity>
          <SwiperButton
            title="Create"
            onPress={() => createNewCollection()}
            gradientProps={{
              colors: [globalVariables.primaryOne, globalVariables.primaryTwo],
            }}
            width={SCREEN_WIDTH / 2.5}
            height={50}></SwiperButton>
        </View>
      </View>
      <AddMoviesModal></AddMoviesModal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
