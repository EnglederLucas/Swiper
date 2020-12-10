import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SwiperButton, SimpleTextInput } from "../../components";
import { globalVariables } from "../../GlobalStyles";
import { firebase, firestore, auth } from "../../firebaseconfig";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const elementWidth = 260;
  const elementHeight = 45;

  const onLoginPressed = async () => {
    try {
      console.log("onLogin");
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      // const user = await getUser(res.user.uid);

      navigation.navigate("Swipe");
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  async function getUser(
    uid: string
  ): Promise<firebase.firestore.DocumentData> {
    const usersRef = firestore().collection("users");

    const document = await usersRef.doc(uid).get();

    if (!document.exists) {
      throw "User already exists";
    }

    return document.data();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require("../../../assets/splash.png")}></Image>
      </View>
      <View style={styles.form}>
        <SimpleTextInput
          width={elementWidth}
          height={elementHeight}
          value={email}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          autoCompleteType="email"
          textContentType="emailAddress"></SimpleTextInput>

        <SimpleTextInput
          width={elementWidth}
          height={elementHeight}
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          autoCompleteType="password"
          textContentType="password"
          secureTextEntry={true}></SimpleTextInput>
      </View>

      <View style={styles.footer}>
        <SwiperButton
          width={elementWidth + 5}
          height={elementHeight + 5}
          title="Login"
          onPress={() => onLoginPressed()}></SwiperButton>

        <Text style={styles.text} onPress={() => navigation.navigate("SignUp")}>
          Not a user yet? Create an account!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: globalVariables.darkBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    flex: 2,
    fontSize: 50,
    color: globalVariables.light,
    justifyContent: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: globalVariables.light,
    textDecorationLine: "underline",
    paddingTop: "3%",
    textAlign: "center",
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
});

export default Login;
