// Necessary Dependencies
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

// Screens
import Home from "../screens/internalScreens/DashBoard";
import Queue from "../screens/internalScreens/Queue";
import Profile from "../screens/internalScreens/Profile";

//Icons
import { icons } from "../constants/icons";

const Tab = createBottomTabNavigator();

const TabIcon = ({ icon, color, focused }) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 25, height: 25 }}
      />
    </View>
  );
};

const Tabs = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#676D75",
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: [{ translateX: -100 }],
          backgroundColor: "#2c2c2c",
          borderRadius: 100,
          height: 70,
          width: 200,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 5,
          zIndex: 999,
          display: "flex",
          justifyContent: "center",
          border: 1,
          borderColor: "#2c2c2c",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 0,
                height: 72,
                width: 50,
              }}
            >
              <Image
                source={require("../assets/icons/home.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? "white" : "#676D75",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Queue"
        component={Queue}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 0,
                borderTopColor: focused ? "white" : "1D1F24",
                borderTopWidth: focused ? 2 : 0,
                height: 72,
                width: 50,
              }}
            >
              <Image
                source={require("../assets/icons/search.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? "white" : "#676D75",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 0,
                height: 72,
                width: 50,
              }}
            >
              <Image
                source={require("../assets/icons/profile.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? "white" : "#676D75",
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 8,
  },
});

export default Tabs;
