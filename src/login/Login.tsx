import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SwiperButton, SimpleTextInput } from "../components";
import { globalVariables } from "../GlobalStyles";
import { firebase } from "../firebaseconfig";
import { useNavigation } from '@react-navigation/native';

const Login = (): JSX.Element => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const elementWidth = 260;
  const elementHeight = 45;

  const onLoginPressed = () => {
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((response) => {
      const uid = response.user.uid;
      const usersRef = firebase.firestore().collection('users')

      usersRef.doc(uid).get()
        .then(firestoreDocument => {
          if(!firestoreDocument.exists) {
            alert("User does not exist!")
            return;
          }
          const user = firestoreDocument.data()
          navigation.navigate('Swipe')
        })
        .catch(e => {
          alert(e)
        });
    })
    .catch(e => {
      alert(e)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Login</Text>
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
      </View>
    </View>
  );
}

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
    flex: 1,
    fontSize: 50,
    color: globalVariables.light,
  },
  footer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Login;
