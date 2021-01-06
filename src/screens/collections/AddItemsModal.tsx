import React, { useRef } from "react";
import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { globalVariables } from "../../GlobalStyles";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/Utils";
import * as Animatable from "react-native-animatable";
import AddToCollection from "./AddToCollection";

type AddCollectionItemsModalProps = {
  collectionId: number;
  visible: boolean;
  onClose: () => void;
};

export default function AddCollectionItemsModal(
  props: AddCollectionItemsModalProps
): JSX.Element {
  const modalClose = useRef<any>(null);

  return (
    <Modal
      animationType="slide"
      style={{ height: SCREEN_HEIGHT }}
      transparent={true}
      statusBarTranslucent={true}
      presentationStyle={"overFullScreen"}
      visible={props.visible}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            zIndex: 300,
            height: "100%",
            width: SCREEN_WIDTH,
            backgroundColor: globalVariables.darkBackgroundSwipeView,
          },
        ]}>
        <View
          style={{
            height: globalVariables.navBarHeight,
            justifyContent: "flex-end",
            flexDirection: "row",
          }}>
          <TouchableOpacity
            onPress={() => {
              modalClose?.current?.rotate();
              props.onClose();
            }}>
            <View style={{ padding: 25, paddingTop: 50 }}>
              <Animatable.Image
                ref={modalClose}
                animation={"rotate"}
                direction={"alternate"}
                duration={1000}
                easing={"ease-out-quad"}
                source={require("./../../../assets/iconsPng/feather-icon/x128.png")}
                fadeDuration={0}
                style={{ width: 32, height: 32 }}
              />
            </View>
          </TouchableOpacity>
        </View>

        <AddToCollection collectionId={props.collectionId}></AddToCollection>
      </View>
    </Modal>
  );
}
