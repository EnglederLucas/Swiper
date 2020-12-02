import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { globalVariables } from "../GlobalStyles";

export interface SwipeCollection {
  id: number;
  name: string;
  dueDate?: Date;
  tags?: string[];
  movies: number[];
}

export default function SwipeCollections() {
  const [collections, setCollections] = useState<SwipeCollection[]>([
    {
      id: 2,
      name: "Horrorabend",
      movies: [10, 20, 30, 50],
      dueDate: new Date(2020, 11, 23),
      tags: ["Spooky"],
    },
    {
      id: 23,
      name: "Dude Movies",
      movies: [115, 8859],
      dueDate: new Date(2020, 11, 27),
      tags: ["Dude"],
    },
    {
      id: 5,
      name: "Not Funny (Actually Kinda)",
      movies: [1824, 3563, 10661, 11017],
      dueDate: new Date(2020, 11, 23),
      tags: ["Spooky"],
    },
  ]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {collections.map(c => (
          <View key={c.id ?? c.name}>
            <Text>{c.name}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: globalVariables.darkBackgroundSwipeView,
    justifyContent: "space-between",
    flexDirection: "column",
  },
  swipeContainer: {
    // height: "92%",
    position: "relative",
    height: 900,
    flex: 1,
    marginTop: 20,
    // marginBottom: 10,
    zIndex: 100,
  },
  scrollContainer: {
    flexDirection: "column",
    flex: 2,
  },
  scrollContent: {},
  containerButton: {},
});
