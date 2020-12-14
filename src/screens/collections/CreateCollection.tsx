import React, { useEffect, useRef, useState } from "react";
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
import { FirestoreService } from "../../services/FirestoreService";

type CreateCollectionProps = {
  onCancel: () => void;
};

export default function CreateCollection(
  props: CreateCollectionProps
): JSX.Element {
  const [collectionName, setCollectionName] = useState("");
  const [plannedDate, setPlannedDate] = useState(Date.now());

  const [searchString, setSearchString] = useState("");

  const [addMoviesVisible, setAddMoviesVisible] = useState(false);

  const [searchResults, setSearchResults] = useState("");
  const [importedList, setImportedList] = useState<string>("");
  const [importListVisible, setImportListVisible] = useState(false);

  const [listId, setListId] = useState("");

  // useEffect(() => {
  // }, [searchString]);

  const modalClose = useRef<any>(null);

  function createNewCollection() {
    const service = FirestoreService.getInstance();

    service
      .createCollection({
        collectionName: collectionName,
        tmdbIdList: parseInt(listId),
      })
      .then(() => props.onCancel());

    return;
  }

  function ImportListModal(): JSX.Element {
    return (
      <Modal
        style={{ height: SCREEN_HEIGHT, backgroundColor: globalVariables.dark }}
        transparent={true}
        statusBarTranslucent={true}
        visible={importListVisible}>
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "column",
              backgroundColor: globalVariables.dark,
              alignItems: "center",
              height: "20%",
              width: "75%",
            }}>
            <SimpleTextInput
              width={230}
              height={50}
              key="TMDBListInput"
              value={listId}
              placeholder="Tmdb List Id"
              onChangeText={text => setListId(text)}></SimpleTextInput>
          </View>
        </View>
      </Modal>
    );
  }

  function AddMoviesModal(): JSX.Element {
    return (<Modal
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
      }}>
      <View
        style={{
          height: globalVariables.navBarHeight,
          justifyContent: "flex-end",
          flexDirection: "row",
        }}>
        <TouchableOpacity
          onPress={() => {
            modalClose?.current?.rotate();
            setAddMoviesVisible(false);
          }}>
          <View style={{ padding: 25, paddingTop: 50 }}>
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
            setAddMoviesVisible(false);
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
  </Modal>);
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
          }}>
          <View
            style={{
              height: globalVariables.navBarHeight,
              justifyContent: "flex-end",
              flexDirection: "row",
            }}>
            <TouchableOpacity
              onPress={() => {
                modalClose?.current?.rotate();
                setAddMoviesVisible(false);
              }}>
              <View style={{ padding: 25, paddingTop: 50 }}>
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
                setAddMoviesVisible(false);
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

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
        }}>
        <View
          style={{
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
              placeholder="Collection Name"
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
                duration={2000}
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
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}>
          <Text
            style={[
              getDefaultTextStyle(16, 300),
              {
                color: getHexColorWithAlpha(globalVariables.light, 90),
                marginRight: 50,
              },
              {
                alignContent: "center",
                justifyContent: "center",
                textAlign: "center",
              },
            ]}>
            Or
          </Text>
          <SimpleTextInput
            // style={{ transform: [{ translateX: -30 }] }}
            width={150}
            height={50}
            key="TMDBListInput"
            value={listId}
            placeholder="Tmdb List Id"
            onChangeText={text => setListId(text)}></SimpleTextInput>
        </View>

        <View
          style={{
            alignSelf: "flex-end",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            paddingBottom: 10,
          }}>
          <TouchableHighlight onPress={() => props.onCancel()}>
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
          </TouchableHighlight>
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
      {/* <AddMoviesModal></AddMoviesModal> */}
      {/* <ImportListModal></ImportListModal> */}
    </View>
  );
}
