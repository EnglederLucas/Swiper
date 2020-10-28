import React, { useEffect } from "react";
import { View, ImageSourcePropType, Image, Text } from "react-native";
import { SwiperButton } from "../components";
import { AuthenticationStackParameterList } from "../../App";
import { StackScreenProps } from "@react-navigation/stack";
import { TmdbHttpService } from "../services/TmdbHttpService";

interface DetailViewProps {
  movieId: number;
}

type NavigationProps = StackScreenProps<
  AuthenticationStackParameterList,
  "Details"
>;

const DetailView = ({ movieId, ...props }: DetailViewProps): JSX.Element => {
  useEffect(() => {
    const service = new TmdbHttpService();
  }, []);

  return (
    <View>
      {/* 
      <SwiperButton
        title="Go Back"
        onPress={() => navigation.pop()}></SwiperButton>
      <View>
        <Text>{route.params.image}</Text>

        <Text>JOJO</Text>
      </View> */}
    </View>
  );
};

export default DetailView;
