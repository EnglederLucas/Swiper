import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ViewStyle,
  StyleProp,
} from "react-native";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import NavBar from "../../components/NavBar";
import { getHexColorWithAlpha, globalVariables } from "../../GlobalStyles";
import * as Animatable from "react-native-animatable";
import { AuthenticationStackParameterList } from "../../../App";
import { StackScreenProps } from "@react-navigation/stack";
import { SwipeCollection } from "../../contracts/Collection";
import { FirestoreService } from "../../services/FirestoreService";

import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { SwiperButton } from "../../components";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/Utils";
import { SwiperButtonWithIcon } from "../../components/SwiperButton";

interface CollectionCardProps {
  collection: SwipeCollection;
  slideUpDelay?: number;
  gap?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export type SwipeCollectionProps = StackScreenProps<
  AuthenticationStackParameterList,
  "SwipeCollections"
>;

export default function SwipeCollections({
  navigation,
}: SwipeCollectionProps): JSX.Element {
  const [collections, setCollections] = useState<SwipeCollection[]>([]);
  const firestoreService = FirestoreService.getInstance();

  const sheetRef = React.useRef<BottomSheet>(null);

  const BOTTOM_SHEET_HEIGHTS = [0, 300, 450];
  const BOTTOM_SHEET_HEADER = 50;

  const [selectedCollection, setSelectedCollection] = useState<
    SwipeCollection | undefined | null
  >(undefined);

  const renderContent = () => (
    <View
      style={{
        backgroundColor: globalVariables.dark,
        padding: 16,
        height: BOTTOM_SHEET_HEIGHTS[2] - BOTTOM_SHEET_HEADER,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}>
      <View
        style={{
          alignSelf: "flex-end",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}>
        <SwiperButton
          // icon={require("../../../assets/iconsPng/feather-icon/plus.png")}
          title="Share"
          style={{ marginRight: 20 }}
          onPress={() => console.log("Share")}
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

  const renderHeader = (): JSX.Element => {
    return (
      <View
        style={{
          backgroundColor: globalVariables.dark,
          height: 50,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <View
          style={{
            backgroundColor: globalVariables.light,
            borderRadius: 10,
            height: 5,
            width: 50,
          }}></View>
      </View>
    );
  };

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    console.log("Fetching Collections");

    firestoreService.getUserSwipeCollections().then(c => {
      if (isMounted) setCollections(c?.creator.concat(c?.member) ?? []);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  function CollectionCard({
    collection,
    slideUpDelay = 1000,
    gap = 20,
    height = 100,
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
          sheetRef?.current?.snapTo(300);
        }}
        // underlayColor={getHexColorWithAlpha(globalVariables.light, 50)}
        activeOpacity={0.9}
        containerStyle={[
          {
            width: "90%",
            height: height,
            borderRadius: 20,
            overflow: "hidden",
          },
          props.style,
        ]}>
        <Animatable.View
          animation={"slideInUp"}
          delay={slideUpDelay}
          duration={1000}
          easing={"ease-out-cubic"}
          style={[
            {
              height: height,
              marginBottom: gap,
              borderRadius: 20,
              backgroundColor: "rgba(0,0,0, 0.5)",
            },
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

  function CreateNewCollectionButton({
    gap = 20,
    height = 100,
    ...props
  }: Omit<CollectionCardProps, "collection"> & {
    onPress: () => void;
  }): JSX.Element {
    return (
      <TouchableHighlight
        onPress={createNewCollection}
        underlayColor={getHexColorWithAlpha(globalVariables.light, 50)}
        containerStyle={{
          width: "90%",
          height: height,
          borderRadius: 20,
          overflow: "hidden",
          marginTop: gap,
          marginBottom: gap,
        }}
        style={{
          borderRadius: 20,
        }}>
        <View
          style={{
            height: height,
            borderRadius: 20,
            borderWidth: 5,
            borderColor: "white",
            borderStyle: "solid",
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Image
            source={require("./../../../assets/iconsPng/feather-icon/plus48.png")}
            fadeDuration={0}
            style={{ width: 32, height: 32 }}
          />
          <Text style={styles.createNewCollection}>Create New Collection</Text>
        </View>
      </TouchableHighlight>
    );
  }

  function createNewCollection() {
    // firestoreService.addSwipeCollection({name: });
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
            <CreateNewCollectionButton
              height={75}
              onPress={() => createNewCollection()}
              key="createNewCollection"></CreateNewCollectionButton>
            <FlatList
              // contentContainerStyle={{ marginTop: 20 }}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 20,
                    backgroundColor: globalVariables.darkBackgroundSwipeView,
                  }}
                />
              )}
              data={collections}
              renderItem={d => (
                <CollectionCard
                  height={75}
                  collection={d.item}
                  slideUpDelay={d.index * 200}></CollectionCard>
              )}
              keyExtractor={item => item.id}
            />
          </View>
          {/* <ScrollView style={styles.scrollContainer}>
            <CreateNewCollectionButton
              onPress={() => createNewCollection()}
              key="createNewCollection"></CreateNewCollectionButton>
            {collections.map((c, i) => (
              <CollectionCard
                key={c.name}
                collection={c}
                slideUpDelay={i * 200}></CollectionCard>
            ))}
          </ScrollView> */}
        </View>
      </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={BOTTOM_SHEET_HEIGHTS}
        renderContent={renderContent}
        renderHeader={renderHeader}
      />
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
    marginTop: 20,
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
    marginLeft: 10,
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
