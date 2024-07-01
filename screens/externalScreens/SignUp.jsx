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
  Platform,
  Keyboard,
} from "react-native";
// The safe area view module
import { SafeAreaView } from "react-native-safe-area-context";
// The firebase module
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// The icons
import icons from "../../constants/icons";
import { doc, setDoc } from "firebase/firestore";

export default function SignUp({ navigation }) {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // Some regex error catching const method (pretty cool) --
  const lowercaseRegex = /[a-z]/; //                      |
  const uppercaseRegex = /[A-Z]/; //                      |
  const numberRegex = /[0-9]/; //                         |
  // ------------------------------------------------------

  // Time to do some error handling
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState({});

  const getErrors = (fullName, email, password, confirmPassword) => {
    const errors = {};

    //This will be the error handling for the Full Name
    if (!fullName) {
      errors.fullName = "Full Name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!email.includes("@") || !email.includes(".")) {
      errors.email = "Invalid email";
    }

    //This will be the error handling for the Password
    if (!password) {
      // If there is no password in the text field display the message below
      errors.password = "Please enter your password";
    } else if (password.length < 8) {
      // If the password is less than 8 characters long display the message below
      errors.password = "The password must be at least 8 characters long";
    } else if (
      !password.includes("!") &&
      !password.includes("@") &&
      !password.includes("#") &&
      !password.includes("$") &&
      !password.includes("%") &&
      !password.includes("^") &&
      !password.includes("&")
    ) {
      // If the password doesnt include any of the following characters display the message below
      errors.password = "Password must include any of these (!,@,#,$,%,^,&)";
    } else if (password === email) {
      // If password and email are the same display the message below
      errors.password =
        "Please make sure that your email and passwords are not the same";
    } else if (!lowercaseRegex.test(password)) {
      // If the password doesnt include a small letter display the message below
      errors.password = "Please include at least 1 small letter";
    } else if (!uppercaseRegex.test(password)) {
      // If the password doesnt include any Capital letters display the message below
      errors.password = "Please include at least 1 capital letter";
    } else if (!numberRegex.test(password)) {
      // If the password doesnt include a number display the message below
      errors.password = "Please include at least 1 number";
    }

    //This will be the error handling for the confirmPassword
    if (confirmPassword != password) {
      errors.confirmPassword = "Please make sure that your passwords match";
    }

    return errors;
  };

  const handleRegister = async () => {
    const errors = getErrors(fullName, email, password, confirmPassword);
    if (Object.keys(errors).length > 0) {
      setShowErrors(true);
      setErrors(showErrors && errors);
      console.log(errors, email, password);

      Object.values(errors).forEach((errorMsg) => {
        ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
      });
    } else {
      //Try will start here
      try {
        setLoading(true);
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setLoading(false);
        // If the response is successful
        ToastAndroid.show("Account created successfully", ToastAndroid.SHORT);
        // Redirect to the Home Page
        navigation.navigate("InternalComponents");

        const user = auth.currentUser;
        console.log("registered");

        if (user) {
          const userRef = doc(db, "users", user.uid);
          await setDoc(userRef, { fullName: fullName });
        }
        setErrors({});
      } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        alert("Registration failed, you may already have an account");
        console.log("registration failed");
      }
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#1a1a1a", flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // paddingBottom: keyboardOpen ? 300 : 0,
          }}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../../assets/images/signuptopimg.png")}
            />

            <View style={styles.overlayContainer}>
              <View style={styles.overlay} />
              <ScrollView style={{ height: "100%" }}>
                <View style={styles.textContainer}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Get Started</Text>
                    <Text style={styles.subtitle}>
                      Nobody likes to wait in lines. Do you?
                    </Text>
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
                        Full Name
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
                          value={fullName}
                          onChangeText={(e) => setFullname(e)}
                          autoCapitalize="none"
                          autoCorrect={false}
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
                    <View
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ color: "#2C9171", fontWeight: "500" }}>
                        Confirm Password
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
                          value={confirmPassword}
                          onChangeText={(e) => setConfirmPassword(e)}
                          secureTextEntry={showConfirmPassword ? false : true}
                          autoCapitalize="none"
                          autoCorrect={false}
                        />
                        <TouchableOpacity
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          <Image
                            source={
                              !showConfirmPassword ? icons.eye : icons.eyeHide
                            }
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
                        onPress={handleRegister}
                      >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                          Sign Up
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
                      marginTop: "5%",
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
                      marginTop: "5%",
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      Already have an account?
                    </Text>
                    <Text
                      style={{ color: "#FFA500" }}
                      onPress={() => navigation.navigate("SignIn")}
                    >
                      {" "}
                      Sign In
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    height: "30%",
    marginLeft: 25,
    resizeMode: "contain",
  },
  overlayContainer: {
    width: "100%",
    height: "80%",
    position: "absolute",
    top: "23.3%",
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
    height: 700,
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
  },
  iconsStyles: {
    width: 50,
    height: 50,
  },
});
