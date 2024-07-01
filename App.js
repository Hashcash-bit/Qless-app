//important Dependencies
import React, { useState, useEffect } from "react";
import { View } from "react-native";

//Navigation Dependencies
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//External Pages
import OnBoardingPage from "./screens/externalScreens/OnBoardingPage";
import SignIn from "./screens/externalScreens/SignIn";
import SignUp from "./screens/externalScreens/SignUp";

//Internal Pages
import DashBoard from "./screens/internalScreens/DashBoard";
import Queue from "./screens/internalScreens/Queue";
import Profile from "./screens/internalScreens/Profile";

// Import the Status Bar
import { StatusBar } from "expo-status-bar";

// Some firebase import
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Inside Stack and the components
const InsideStack = createNativeStackNavigator();
function PrivateStack() {
  return (
    <InsideStack.Navigator screenOptions={{ headerShown: false }}>
      <InsideStack.Screen name="Dashboard" component={Tabs} />
    </InsideStack.Navigator>
  );
}

// Public Stack
const Stack = createNativeStackNavigator();

export default App = () => {
  // Create a state for the users presence
  const [user, setUser] = useState(null);
  // The loading state variable is used to show a loading screen while checking the authentication state
  const [loading, setLoading] = useState(true);

  // Lets create quick try catch to detect user presence
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      console.log("user", user);
    });
  }, []);

  if (loading) {
    // This is where the loading screen will be
    return <View />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "slide_from_right" }}
      >
        {!user ? (
          //User not logged in? Show the external stack
          <>
            {/* This will be testing area */}
            <Stack.Screen name="OnBoarding" component={OnBoardingPage} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen
              name="Tabs"
              component={Tabs}
              screenOptions={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="OnBoarding" component={OnBoardingPage} />
            <Stack.Screen
              name="InternalComponents"
              component={PrivateStack}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
