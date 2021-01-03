import React, { useRef, useState } from "react";
import { View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { SimpleTextInput } from "../../components";
import { globalVariables } from "../../GlobalStyles";
import { SCREEN_HEIGHT } from "../../utils/Utils";
import * as Animatable from "react-native-animatable";

type AddCollectionItemsModalProps = {
  visible: boolean;
  onClose: () => void;
};

export default function AddCollectionItemsModal(
  props: AddCollectionItemsModalProps
): JSX.Element {
  const modalClose = useRef<any>(null);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [importedList, setImportedList] = useState<string>("");

  return (
    <Modal
      animationType="slide"
      style={{ height: SCREEN_HEIGHT, backgroundColor: globalVariables.dark }}
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
            width: SCREEN_HEIGHT,
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 25,
          }}>
          <SimpleTextInput
            width={260}
            height={50}
            value={importedList}
            placeholder="Import List"
            onChangeText={text => setImportedList(text)}></SimpleTextInput>
          <TouchableOpacity
            onPress={() => {
              props.onClose();
            }}>
            <View style={{ padding: 20, paddingTop: 40 }}>
              <Animatable.Image
                animation={"bounceIn"}
                duration={750}
                easing={"ease-out-quad"}
                source={require("./../../../assets/iconsPng/feather-icon/upload.png")}
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
