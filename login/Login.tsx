import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet, ColorPropType } from "react-native";
import SwiperTextInput from "../components/SwiperTextInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <View style={styles.container}>
        <SwiperTextInput
          value={email}
          placeholder="Email"
          //   selectionColor="#00ffff"
          //   underlineColorAndroid="#00ffff"
          onChangeText={(text) => setEmail(text)}
          autoCompleteType="email"
          textContentType="emailAddress"
        ></SwiperTextInput>

        <SwiperTextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}
        ></SwiperTextInput>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 50,
  },
});

export default Login;
