import DropdownAlert from "react-native-dropdownalert";
import styles from "../Main/styles";
import Color from "../../components/Colors";
import { Feather } from "@expo/vector-icons";
import * as firebase from "firebase";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import GoogleConfig from "../../config/GoogleConfig";
import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard
} from "react-native";

export default class Main extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      passwordText: "",
      EmailText: "",
      keyboardOpen: "false"
    };
  }

  componentDidMount() {}

  SignIn = () => {
    const { email, password } = this.state;
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
          this.dropDownAlertRef.alertWithType("error", "Error", err.message);
          return;
        })
        .then(() => {
          this.dropDownAlertRef.alertWithType(
            "success",
            "Sucess",
            "User SignIn"
          );
        });
    } catch (err) {
      this.dropDownAlertRef.alertWithType("error", "Error", err.message);
    }
  };

  SignUp = () => {
    const { email, password } = this.state;

    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
          this.dropDownAlertRef.alertWithType("error", "Error", err.message);
          return;
        })
        .then(() =>
          this.dropDownAlertRef.alertWithType(
            "success",
            "Sucess",
            "User Created"
          )
        );
    } catch (err) {
      this.dropDownAlertRef.alertWithType("error", "Error", err.message);
    }
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = googleUser => {
    var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
      unsubscribe();
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(() =>
            this.dropDownAlertRef.alertWithType(
              "success",
              "Sucess",
              "User Created with Google"
            )
          )
          .catch(error => {
            this.dropDownAlertRef.alertWithType(
              "error",
              "Error",
              error.message
            );
          });
      } else {
        console.log("User already signed-in Firebase.");
      }
    });
  };

  SignInGoogle = async () => {
    try {
      const result = await Google.logInAsync(GoogleConfig);
      if ((result.type = "success")) {
        this.onSignIn(result);
      } else {
        return { cancelled: true };
      }
    } catch (error) {
      this.dropDownAlertRef.alertWithType("error", " Erroer", error.message);
    }
  };

  SignInFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "493147374607834",
      { permissions: ["public_profile"] }
    );
    try {
      if (type == "success") {
        let credencial = firebase.auth.FacebookAuthProvider.credential(token);
        firebase
          .auth()
          .signInWithCredential(credencial)
          .catch(err => {
            this.dropDownAlertRef.alertWithType("error", "Error", err.message);
            return;
          })
          .then(() =>
            this.dropDownAlertRef.alertWithType(
              "success",
              "Sucess",
              "User Created with Facebook"
            )
          );
      }
    } catch ({ message }) {
      this.dropDownAlertRef.alertWithType(
        "error",
        "Error",
        `Facebook login erro: ${message}`
      );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={[styles.container]}>
        <DropdownAlert ref={ref => (this.dropDownAlertRef = ref)} />
        <SafeAreaView style={{ marginTop: 90 + 2 }}>
          <Text style={styles.title}>Firebase Authentication</Text>
          <View style={styles.viewInput}>
            <Feather name="user" size={32} color={Color.azulMarinho} />
            <TextInput
              onSubmitEditing={Keyboard.dismiss}
              style={styles.input}
              placeholder="Email"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={text => {
                this.setState({ email: text });
              }}
              value={this.state.email}
              placeholderTextColor={Color.azulMarinho}
              returnKeyType="send"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.viewInput}>
            <Feather name="lock" size={32} color={Color.azulMarinho} />
            <TextInput
              onSubmitEditing={Keyboard.dismiss}
              placeholder="Password"
              style={styles.input}
              autoCorrect={false}
              onChangeText={text => {
                this.setState({ password: text });
              }}
              value={this.state.password}
              placeholderTextColor={Color.azulMarinho}
              returnKeyType="send"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => this.SignIn()}>
            <Text style={styles.buttonText}> SIGN IN</Text>
          </TouchableOpacity>

          <View style={styles.socialView}>
            <TouchableOpacity
              style={[
                styles.button,
                { flex: 1, backgroundColor: Color.vermelho }
              ]}
              onPress={() => this.SignInGoogle()}
            >
              <Text style={styles.buttonText}> Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { flex: 1, backgroundColor: Color.azulForte }
              ]}
              onPress={() => this.SignInFacebook()}
            >
              <Text style={styles.buttonText}> Facebook</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "", alignSelf: "flex-start", marginTop: 0 }
            ]}
            onPress={() => this.SignUp()}
          >
            <Text style={styles.buttonText}> Create Account</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
