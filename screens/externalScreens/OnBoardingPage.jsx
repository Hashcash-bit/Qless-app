// Importing the necessary modules
import * as React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Import the AuthSession and Google modules
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
// Import the firebase modules
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithCredential,
  getAuth,
} from "firebase/auth";
import { auth } from "../../firebase";
// Importing the async storage module
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function OnBoardingPage({ navigation }) {
  // Create a state for the users presence
  const [user, setUser] = React.useState(null);

  const handleRedirect = () => {
    if (user) {
      navigation.navigate("InternalComponents");
    } else {
      // Prompt the user to sign in page
      navigation.navigate("SignIn");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#1A1A1A" }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            paddingHorizontal: 25,
          }}
        >
          <Image
            style={{
              resizeMode: "contain",
              height: 90,
              width: 159,
            }}
            source={require("../../assets/images/logo.png")}
          />
          <Image
            style={{
              resizeMode: "contain",
              height: "50%",
              width: "100%",
              marginTop: 10,
            }}
            source={require("../../assets/images/cards.png")}
          />
          <View
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                padding: 10,
                backgroundColor: "#2C9171",
                fontWeight: "bold",
                fontSize: 13,
                color: "white",
                borderRadius: 10,
                width: 100,
                textAlign: "center",
              }}
            >
              Streamline
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 43,
                color: "white",
                textAlign: "left",
                letterSpacing: 0,
              }}
            >
              Queue up {""}
              <Text style={{ color: "#FFA500" }}>Seamlessly</Text>
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleRedirect}
            style={{
              width: "100%",
              paddingBottom: 20,
            }}
          >
            {user ? (
              <Text
                style={{
                  fontSize: 18,
                  backgroundColor: "#2C2C2C",
                  textAlign: "center",
                  padding: 18,
                  borderRadius: 100,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Continue as {user.email}
              </Text>
            ) : (
              <View
                style={{
                  backgroundColor: "#2C2C2C",
                  textAlign: "center",
                  paddingVertical: 18,
                  borderRadius: 100,
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Image
                  style={{ width: 35, height: 35, resizeMode: "contain" }}
                  source={require("../../assets/icons/google_nobg.png")}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  Continue with Google
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#1A1A1A" />
    </SafeAreaView>
  );
}
