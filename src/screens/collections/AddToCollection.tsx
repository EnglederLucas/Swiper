import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SimpleTextInput, SwiperTextInput } from "../../components";
import BottomSheetHeader from "../../components/BottomSheetHeader";
import SearchResultCard from "../../components/SearchResultCard";
import * as Animatable from "react-native-animatable";
import BottomSheet from "reanimated-bottom-sheet";
import { MovieItem, MovieResponse } from "../../contracts/TmdbTypes";
import { AppendType, TmdbService } from "../../services/TmdbService";
import {
  getHexColorWithAlpha,
  globalStyles,
  globalVariables,
} from "../../GlobalStyles";
import DetailView from "../swipe/DetailView";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../utils/Utils";
import { tailwind } from "../../../tailwind";
import { ScrollView } from "react-native-gesture-handler";

type AddToCollectionProps = {
  collectionId: number;
  onClose?: () => void;
};

export default function AddToCollection(props: AddToCollectionProps) {
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState<MovieItem[]>();
  const [importedList, setImportedList] = useState<string>("");

  const [selectedMovie, setSelectedMovie] = useState<
    MovieResponse & AppendType
  >(null);

  const sheetRef = React.useRef<BottomSheet>(null);

  const BOTTOM_SHEET_HEIGHTS = [0, 400, SCREEN_HEIGHT - 75];
  const BOTTOM_SHEET_HEADER = 50;

  const renderContent = () => (
    <View
      style={{
        backgroundColor: globalVariables.dark,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
      {/* <View style={{ height: 180 }}></View> */}
      <DetailView movie={selectedMovie}></DetailView>
    </View>
  );

  async function searchForTerm(term: string) {
    setSearchString(term);
    const tmdb = TmdbService.getInstance();
    const res = await tmdb.searchMovieExtended(term);
    setSearchResults(res);
  }

  async function showDetailsToMovie(movie: MovieItem) {
    const movieWithAppend = await TmdbService.Instance.fetchMovieWithAppend(
      movie.id,
      "videos",
      "credits"
    );

    setSelectedMovie(movieWithAppend);
    sheetRef?.current?.snapTo(1);
  }

  return (
    <View style={tailwind("flex-1 flex-col bg-dark-two")}>
      <View style={tailwind("mt-12 flex justify-center flex-row")}>
        <SwiperTextInput
          onChangeText={t => searchForTerm(t)}
          value={searchString}
          placeholder="Search"
          placeholderTextColor={getHexColorWithAlpha("#ffffff", 50)}
          textInputStyle={{ textDecorationLine: "none" }}
          underlineColorAndroid="transparent"
          borderRadius={5}
          height={50}
          width={0.9 * SCREEN_WIDTH}
          borderWidth={5}></SwiperTextInput>
      </View>

      {searchResults?.length === 0 && (
        <View style={tailwind("w-full justify-center items-center h-20")}>
          <Text style={tailwind("text-xl text-white font-montserrat-200")}>
            No Movies Found
          </Text>
        </View>
      )}

      <FlatList
        data={searchResults}
        onEndReached={() => console.log("End")}
        onEndReachedThreshold={0.5}
        renderItem={sR => (
          <SearchResultCard
            key={sR.item.id}
            height={150}
            result={sR.item}
            marginTop={5}
            padding={10}
            alignMode={"left"}
            selectMovie={movie => showDetailsToMovie(movie)}></SearchResultCard>
        )}
        keyExtractor={item => item.id.toString()}></FlatList>
      <BottomSheet
        ref={sheetRef}
        enabledManualSnapping={true}
        snapPoints={BOTTOM_SHEET_HEIGHTS}
        renderContent={renderContent}
        renderHeader={() => <BottomSheetHeader></BottomSheetHeader>}
      />
    </View>
  );
}

/*
      <View
        style={
          (tailwind("flex-col items-center"),
          {
            margin: 25,
            backgroundColor: globalVariables.darkBackgroundSwipeView,
          })
        }>
        <SimpleTextInput
          width={260}
          height={50}
          value={searchString}
          placeholder="Import List"
          onChangeText={text => searchForTerm(text)}></SimpleTextInput>
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
      */
