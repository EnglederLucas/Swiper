import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ViewStyle,
  StyleProp,
  ImageSourcePropType,
  Modal,
  TouchableOpacity as RNTouchableOpacity,
} from "react-native";
import {
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import NavBar from "../../components/NavBar";
import {
  getDefaultTextStyle,
  getHexColorWithAlpha,
  globalVariables,
} from "../../GlobalStyles";
import * as Animatable from "react-native-animatable";
import { AuthenticationStackParameterList } from "../../../App";
import { StackScreenProps } from "@react-navigation/stack";
import { SwipeCollection } from "../../contracts/Collection";
import { FirestoreService } from "../../services/FirestoreService";

import BottomSheet from "reanimated-bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { SwiperButton } from "../../components";
import { SCREEN_WIDTH } from "../../utils/Utils";
import { Modalize } from "react-native-modalize";
import CreateCollection from "./CreateCollection";
import { QRCode } from "react-native-custom-qr-codes-expo";
import QRCodeScanner from "../../components/QRCodeScanner";
import { auth } from "../../firebaseconfig";
import Axios from "axios";
import BottomSheetHeader from "../../components/BottomSheetHeader";

interface CollectionCardProps {
  collection: SwipeCollection;
  slideUpDelay?: number;
  gap?: number;
  height?: number;
  animate?: boolean;
  style?: StyleProp<ViewStyle>;
  onAnimationEnd?: () => void;
}

export type SwipeCollectionProps = StackScreenProps<
  AuthenticationStackParameterList,
  "SwipeCollections"
>;

export default function SwipeCollections({
  navigation,
}: SwipeCollectionProps): JSX.Element {
  const [collections, setCollections] = useState<SwipeCollection[]>([]);
  const [animationAlreadyRan, setAnimationAlreadyRan] = useState(false);
  const firestoreService = FirestoreService.getInstance();

  const [scanVisible, setScanVisible] = useState(false);

  const sheetRef = React.useRef<BottomSheet>(null);
  const createCollectionSheetRef = React.useRef<BottomSheet>(null);

  const BOTTOM_SHEET_HEIGHTS = [0, 200, 200];
  const CREATE_COLLECTION_SHEET_HEIGHTS = [0, 500, 500];

  const BOTTOM_SHEET_HEADER = 50;

  const [selectedCollection, setSelectedCollection] = useState<
    SwipeCollection | undefined | null
  >(undefined);

  const [shareCollectionVisible, setShareCollectionVisible] = useState(false);

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    console.log("Fetching Collections");

    firestoreService
      .getUserSwipeCollections()
      .then(c => {
        if (isMounted) setCollections(c?.creator.concat(c?.member) ?? []);
      })
      .catch(() => console.log("Firebase Error"));

    setAnimationAlreadyRan(false);

    return () => {
      isMounted = false;
    };
  }, []);

  function getCollections() {
    firestoreService.getUserSwipeCollections().then(c => {
      setCollections(c?.creator.concat(c?.member) ?? []);
    });

    setAnimationAlreadyRan(false);
  }

  const modalizeRef = useRef<Modalize>(null);

  const modalClose = useRef<any>(null);

  function ShareModal(): JSX.Element {
    return (
      <Modal
        animationType="slide"
        style={{ alignItems: "center", backgroundColor: globalVariables.dark }}
        transparent={true}
        statusBarTranslucent={true}
        presentationStyle={"overFullScreen"}
        visible={shareCollectionVisible}>
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
              backgroundColor: globalVariables.darkBackgroundSwipeView,
              height: 400,
              width: "80%",
              borderRadius: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              // padding: 20,
            }}>
            <RNTouchableOpacity
              style={{
                alignSelf: "flex-end",
              }}
              onPress={() => {
                modalClose?.current?.rotate();
                setShareCollectionVisible(false);
              }}>
              <View
                style={{ paddingTop: 30, marginRight: 30, marginBottom: 30 }}>
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
            </RNTouchableOpacity>

            <QRCode
              content={selectedCollection?.id}
              color={getHexColorWithAlpha(globalVariables.light, 70)}></QRCode>
          </View>
        </View>
      </Modal>
    );
  }

  const renderContent = () => (
    <View
      style={{
        backgroundColor: globalVariables.dark,
        paddingBottom: 30,
        height: BOTTOM_SHEET_HEIGHTS[2] - BOTTOM_SHEET_HEADER,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flex: 3,
          width: "90%",
          marginLeft: "8%",
        }}>
        <View>
          <Text style={[getDefaultTextStyle(24, 500)]}>
            {selectedCollection?.name}
          </Text>
          <Text
            style={[
              getDefaultTextStyle(10, 500),
              { color: "rgba(0,0,0, 0.8)" },
            ]}>
            {selectedCollection?.plannedDate}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>{}</View>

      <View
        style={{
          alignSelf: "flex-end",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flex: 1,
        }}>
        <SwiperButton
          // icon={require("../../../assets/iconsPng/feather-icon/plus.png")}
          title="Share"
          style={{ marginRight: 20 }}
          onPress={() => setShareCollectionVisible(true)}
          width={SCREEN_WIDTH / 2.5}
          gradientProps={{
            colors: [globalVariables.primaryTwo, globalVariables.primaryOne],
          }}
          height={50}></SwiperButton>
        <SwiperButton
          title="Swipe"
          onPress={() =>
            navigation.navigate("Swipe", {
              collectionId: selectedCollection.id,
            })
          }
          gradientProps={{
            colors: [globalVariables.primaryOne, globalVariables.primaryTwo],
          }}
          width={SCREEN_WIDTH / 2.5}
          height={50}></SwiperButton>
      </View>
    </View>
  );

  const renderCreateCollection = (): JSX.Element => {
    return (
      <View
        style={{
          backgroundColor: globalVariables.dark,
          paddingBottom: 15,
          height: CREATE_COLLECTION_SHEET_HEIGHTS[2] - BOTTOM_SHEET_HEADER,
        }}>
        <CreateCollection
          onCancel={() => {
            createCollectionSheetRef?.current?.snapTo(0);
            getCollections();
          }}></CreateCollection>
      </View>
    );
  };

  function CollectionCard({
    collection,
    height = 100,
    animate = true,

    ...props
  }: CollectionCardProps): JSX.Element {
    return (
      <TouchableOpacity
        style={{
          borderRadius: 20,
          overflow: "hidden",
        }}
        onPress={() => {
          setSelectedCollection(collection);
          sheetRef?.current?.snapTo(1);
        }}
        onLongPress={() =>
          setCollections(collections =>
            collections.filter(d => d.id !== collection.id)
          )
        }
        // underlayColor={getHexColorWithAlpha(globalVariables.light, 50)}
        activeOpacity={0.9}
        containerStyle={[
          {
            width: "90%",
            height: height,
            borderRadius: 20,
            overflow: "hidden",
          },
          props.gap ? { marginBottom: props.gap } : {},

          props.style,
        ]}>
        <Animatable.View
          // animation={"slideInUp"}
          animation={animationAlreadyRan ? "" : "slideInUp"}
          delay={props.slideUpDelay}
          duration={500}
          easing={"ease-out-cubic"}
          onAnimationEnd={() =>
            props?.onAnimationEnd ? props?.onAnimationEnd() : undefined
          }
          key={collection.id + "AnimationView"}
          style={[
            {
              height: height,
              borderRadius: 20,
              backgroundColor: "rgba(0,0,0, 0.5)",
            },
            props.gap ? { marginBottom: props.gap } : {},
            styles.collectionCard1,
          ]}>
          <LinearGradient
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 20,
              overflow: "hidden",
            }}
            start={{ x: 0.0, y: 0.5 }}
            end={{ x: 1.0, y: 0.5 }}
            colors={[globalVariables.primaryOne, globalVariables.primaryTwo]}>
            <Text style={styles.collectionName}>{collection.name}</Text>
            <Text style={styles.plannedDate}>{collection.plannedDate}</Text>
          </LinearGradient>
          {/* <Text style={styles.collectionName}>{collection.name}</Text> */}
        </Animatable.View>
      </TouchableOpacity>
    );
  }

  function ActionButton({
    gap = 20,
    height = 100,
    ...props
  }: Omit<CollectionCardProps, "collection"> & {
    onPress: () => void;
    imgSrc: ImageSourcePropType;
    title: string;
    style?: StyleProp<ViewStyle>;
  }): JSX.Element {
    return (
      <TouchableHighlight
        onPress={() => props.onPress()}
        underlayColor={getHexColorWithAlpha(globalVariables.light, 50)}
        containerStyle={[
          {
            width: "90%",
            height: height,
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: gap,
          },
          props.style,
        ]}
        style={{
          borderRadius: 20,
        }}>
        <View
          style={{
            height: height,
            borderRadius: 20,
            borderWidth: 3,
            borderColor: getHexColorWithAlpha(globalVariables.light, 80),
            borderStyle: "solid",
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Image
            source={props.imgSrc}
            fadeDuration={0}
            style={{ width: 32, height: 32 }}
          />
          <Text style={styles.createNewCollection}>{props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  function createNewCollection() {
    createCollectionSheetRef?.current?.snapTo(1);
  }

  function scanCollection() {
    setScanVisible(true);
  }

  async function handleScan(data: any) {
    const uid = auth()?.currentUser?.uid;
    console.log(uid);

    if (!uid) return null;

    await Axios.post<void>(
      " https://us-central1-swiper-9cfe9.cloudfunctions.net/webApi/swipeCollection",
      {
        swipeCollectionId: data,
        userId: uid,
      }
    );
  }

  return (
    <>
      <NavBar></NavBar>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: globalVariables.montserrat600SemiBold,
              color: globalVariables.light,
              textAlign: "left",
              marginLeft: 10,
            }}>
            Collections
          </Text>
          <View>
            <ActionButton
              style={{ marginTop: 20 }}
              title="Create Collection"
              height={75}
              onPress={() => createNewCollection()}
              imgSrc={require("./../../../assets/iconsPng/feather-icon/plus48.png")}
              key="createNewCollection"></ActionButton>
            <ActionButton
              title=" Scan Collection"
              height={75}
              onPress={() => scanCollection()}
              imgSrc={require("./../../../assets/iconsPng/feather-icon/qr-code.png")}
              key="scanCollection"></ActionButton>
            <FlatList
              key="flatList"
              contentContainerStyle={{
                backgroundColor: globalVariables.darkBackgroundSwipeView,
              }}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 21,
                    backgroundColor: globalVariables.darkBackgroundSwipeView,
                  }}
                />
              )}
              data={collections}
              renderItem={d => (
                <CollectionCard
                  key={d.item.id}
                  height={75}
                  collection={d.item}
                  slideUpDelay={d.index * 300}
                  onAnimationEnd={
                    d.index === collections?.length - 1
                      ? () => setAnimationAlreadyRan(true)
                      : undefined
                  }></CollectionCard>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>

      {/* <ScrollView style={styles.scrollContainer}>

            {collections.map((c, i) => (
              <CollectionCard
                gap={20}
                key={c.id}
                height={75}
                collection={c}
                slideUpDelay={i * 300}
                onAnimationEnd={
                  i === collections?.length - 1
                    ? () => setAnimationAlreadyRan(true)
                    : undefined
                }></CollectionCard>
            ))}
          </ScrollView> */}
      {/* </View>  */}
      <BottomSheet
        ref={sheetRef}
        snapPoints={BOTTOM_SHEET_HEIGHTS}
        renderContent={renderContent}
        renderHeader={() => <BottomSheetHeader></BottomSheetHeader>}
      />
      <BottomSheet
        ref={createCollectionSheetRef}
        snapPoints={CREATE_COLLECTION_SHEET_HEIGHTS}
        renderContent={renderCreateCollection}
        renderHeader={() => <BottomSheetHeader></BottomSheetHeader>}
      />
      {/* <Modalize ref={modalizeRef}>...your content</Modalize> */}
      <ShareModal></ShareModal>
      {scanVisible && (
        <QRCodeScanner
          onScanned={data => {
            console.log(data);
            handleScan(data).then(() => setScanVisible(false));
            getCollections();
          }}></QRCodeScanner>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: globalVariables.darkBackgroundSwipeView,
    // backgroundColor: "green",
    color: globalVariables.light,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  contentWrapper: {
    marginLeft: globalVariables.textMarginLeft,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: 20,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  scrollContent: {},
  containerButton: {},
  collectionCard1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  collectionName: {
    fontSize: 22,
    color: globalVariables.light,
    fontFamily: globalVariables.montserrat400Regular,
    marginTop: 10,
    marginLeft: 15,
  },
  plannedDate: {
    fontSize: 12,
    color: globalVariables.light,
    fontFamily: globalVariables.montserrat300Light,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginRight: 10,
  },
  createNewCollection: {
    fontSize: 22,
    color: globalVariables.light,
    fontFamily: globalVariables.montserrat400Regular,
  },
});
