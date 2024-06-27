// Importing the necessary modules
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
//The top bar with the time, battery, etc.
import { StatusBar } from "react-native";
//The router module
import { Link, router } from "expo-router";
//The safe area view module
import { SafeAreaView } from "react-native-safe-area-context";
// Importing the relevant firebase module
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function OnBoardingPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRedirect = () => {
    if (user) {
      router.push("/(tabs)/home");
      if (user.email && user.uid) {
        console.log("User is signed in");
        console.log("User Email: ", user.email);
        console.log("User UID: ", user.uid);
      }
    } else {
      router.push("/(auth)/sign-in");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user && user.email) {
        const emailParts = user.email.split("@")[0];
        const truncatedEmail =
          emailParts.length > 6 ? emailParts.slice(0, 6) + "..." : emailParts;
        setEmail(truncatedEmail);
      } else {
        setEmail("");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
            source={require("../assets/images/logo.png")}
          />
          <Image
            style={{
              resizeMode: "contain",
              height: "50%",
              width: "100%",
              marginTop: 10,
            }}
            source={require("../assets/images/cards.png")}
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
                  fontSize: 15,
                  backgroundColor: "#2C9171",
                  textAlign: "center",
                  padding: 15,
                  borderRadius: 100,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Continue as {email}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 15,
                  backgroundColor: "#2C9171",
                  textAlign: "center",
                  paddingVertical: 15,
                  borderRadius: 100,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Get Started
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#1A1A1A" />
    </SafeAreaView>
  );
}
