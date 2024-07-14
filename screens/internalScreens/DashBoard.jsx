// Necessary Modules
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
// Expo Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  return (
    <View style={styles.OverallContainer}>
      <View style={styles.TopHalf}>
        <View style={styles.IntroTxtContainer}>
          <Text style={styles.Greetings}>Good Afternoon,</Text>
          <View style={styles.NameNotifContainer}>
            <Text style={styles.Name}>John Doe Junior</Text>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="bell-badge"
                size={24}
                style={styles.NotifIcon}
                color="#2F69FE" // This is the color of the bell icon when the user has a notification, otherwise it should be #9CBEB3
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.LocalClinicContainer}>
          <Text style={styles.LocalClinicHeader}>Local Clinic</Text>
          <View style={styles.AddClinicContainer}>
            <TouchableOpacity style={styles.AddClinicBtn}>
              <FontAwesome5
                style={styles.AddClinicIcon}
                name="clinic-medical"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            <Text style={styles.AddClinicTxt}>
              Add your local healthcare facility
            </Text>
          </View>
        </View>
        <View style={styles.PeopleContainer}>
          <Text style={styles.PeopleHeader}>People</Text>
          <View style={styles.AddPeopleContainer}>
            <TouchableOpacity style={styles.AddPeopleBtn}>
              <Ionicons
                style={styles.AddPeopleIcon}
                name="people"
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
            <Text style={styles.AddPeopleTxt}>
              Add your local healthcare facility
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.BottomHalf}>
        <Text style={styles.QueueHeader}>You are currently</Text>
        <Text style={styles.QueueStatus}>Not Queued In</Text>
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  OverallContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-between",
  },
  TopHalf: {
    display: "flex",
    flexDirection: "column",
  },
  IntroTxtContainer: {
    display: "flex",
    flexDirection: "column",
  },
  Greetings: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2F69FE",
  },
  NameNotifContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  LocalClinicContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
  },
  LocalClinicHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  AddClinicContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  AddClinicBtn: {
    backgroundColor: "#2F69FE",
    padding: 10,
    borderRadius: 10,
  },
  AddClinicIcon: {},
  AddClinicTxt: {
    marginLeft: 10,
    fontSize: 16,
  },
  PeopleContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
  },
  PeopleHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  AddPeopleContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  AddPeopleBtn: {
    backgroundColor: "#2F69FE",
    padding: 10,
    borderRadius: 10,
  },
  AddPeopleIcon: {},
  AddPeopleTxt: {
    marginLeft: 10,
    fontSize: 16,
  },
  BottomHalf: {
    display: "flex",
    flexDirection: "column",
    marginTop: 50,
  },
  QueueHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  QueueStatus: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F69FE",
  },
});
