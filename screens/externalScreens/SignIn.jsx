// Importing necessary modules
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from "react-native";
// The safe area view module
import { SafeAreaView } from "react-native-safe-area-context";
// The firebase module
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
//Icons
import icons from "../../constants/icons";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //Lets do some error handling
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const getErrors = (email, password) => {
    const errors = {};
    // This is the error handling for the email
    if (!email) {
      // If there is no email value in the text input display the message below
      errors.email = "Please enter your email";
    } else if (!email.includes("@") || !email.includes(".com")) {
      // If there is no @ sign and .com in the email display the message below
      errors.email = "Please enter a proper email (johndoe@whatever.com)";
    }

    //This will be the error handling for the Password
    if (!password) {
      // If there is no password in the text field display the message below
      errors.password = "Please enter your password";
    }
    return errors;
  };

  const handleLogin = async () => {
    const errors = getErrors(email, password);
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      setErrors(showErrors && errors);
      console.log(errors, email, password);
      Object.values(errors).forEach((errorMsg) => {
        ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
      });
    } else {
      //Try catch block to handle the login process
      try {
        setLoading(true);
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setLoading(false);
        ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
        navigation.navigate("Tabs");
        setErrors({});
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        alert("Please check your credentials, you may not have an account");
        console.log("Login Failed");
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#1a1a1a", flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/images/signintopimg.png")}
          />
          <View style={styles.overlayContainer}>
            <View style={styles.overlay} />
            <View style={styles.textContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>You're back! We missed you!</Text>
              </View>
              <View style={styles.textFields}>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "#2C9171", fontWeight: "500" }}>
                    Email Address
                  </Text>
                  <View
                    style={{
                      borderColor: "#2C9171",
                      borderWidth: 1,
                      height: 45,
                      width: "100%",
                      padding: 6,
                      alignContent: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 5,
                      borderRadius: 5,
                    }}
                  >
                    <TextInput
                      style={{
                        flexGrow: 1,
                        color: "white",
                        fontWeight: "500",
                        overflowX: "scroll",
                      }}
                      value={email}
                      onChangeText={(e) => setEmail(e)}
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "#2C9171", fontWeight: "500" }}>
                    Password
                  </Text>
                  <View
                    style={{
                      borderColor: "#2C9171",
                      borderWidth: 1,
                      height: 45,
                      width: "100%",
                      padding: 6,
                      alignContent: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 5,
                      borderRadius: 5,
                    }}
                  >
                    <TextInput
                      style={{
                        flexGrow: 1,
                        color: "white",
                        fontWeight: "500",
                        overflowX: "scroll",
                        width: "70%",
                      }}
                      value={password}
                      onChangeText={(e) => setPassword(e)}
                      secureTextEntry={showPassword ? false : true}
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Image
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        style={{ width: 25, height: 25 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {loading ? (
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "6%",
                    }}
                  >
                    Loading...
                  </Text>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#2C9171",
                      padding: 10,
                      borderRadius: 10,
                      width: "70%",
                      alignItems: "center",
                      marginTop: "6%",
                    }}
                    onPress={handleLogin}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      Log In
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "6%",
                }}
              >
                <View
                  style={{
                    // padding: 5,
                    borderWidth: 0.5,
                    borderColor: "white",
                    width: "30%",
                  }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignContent: "center",
                    color: "white",
                    fontSize: 13,
                  }}
                >
                  Or continue with
                </Text>
                <View
                  style={{
                    // padding: 5,
                    borderWidth: 0.5,
                    borderColor: "white",
                    width: "30%",
                  }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "6%",
                  gap: 15,
                }}
              >
                <TouchableOpacity>
                  <Image
                    style={styles.iconsStyles}
                    source={require("../../assets/icons/facebook.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={styles.iconsStyles}
                    source={require("../../assets/icons/google.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={styles.iconsStyles}
                    source={require("../../assets/icons/apple.png")}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  alignContent: "center",
                  justifyContent: "center",
                  marginTop: "6%",
                }}
              >
                <Text style={{ color: "white" }}>Don't have an account?</Text>
                <Text
                  style={{ color: "#FFA500" }}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  {" "}
                  Sign Up
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    height: "100%",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "35%",
    marginTop: -30,
    resizeMode: "contain",
  },
  overlayContainer: {
    width: "100%",
    height: "75%",
    position: "absolute",
    top: "26.3%",
    backgroundColor: "#232323",
    opacity: 0.9,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#232323",
    opacity: 0.9,
  },
  textContainer: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 25,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    color: "#2C9171",
    fontSize: 16,
    fontWeight: "500",
  },
  textFields: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "5%",
  },
  iconsStyles: {
    width: 50,
    height: 50,
  },
});
