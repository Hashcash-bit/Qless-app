import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const GradientBorder = (props) => {
  return (
    <LinearGradient
      colors={["#2C9171", "#194034", "#0F1714", "#0D0D0D"]}
      style={{ borderRadius: 50, padding: 2, marginTop: 50 }}
    >
      <LinearGradient
        colors={["#2C2C2C", "#1A1A1A", "#0D0D0D"]}
        style={{ borderRadius: 10, ...props.style }}
      >
        {props.children}
      </LinearGradient>
    </LinearGradient>
  );
};

const FeatureGuide = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  const steps = [
    {
      title: "Booking Made Easy",
      text: (
        <Text>
          Find your local clinic, send a request and get verified,then book an
          appointment, all with the{" "}
          <Text style={{ fontWeight: "bold", color: "#FFA500" }}>
            Tap Of A Button
          </Text>
          .
        </Text>
      ),
      image: require("../../assets/images/ModalImage1.png"), // replace with actual image path
    },
    {
      title: "Queue Up From Anywhere",
      text: (
        <Text>
          Remove yourself from standing in lines waiting for your turn. Reserve
          your spot in a{" "}
          <Text style={{ fontWeight: "bold", color: "#FFA500" }}>
            Virtual Queue
          </Text>{" "}
          while you tend to your needs.
        </Text>
      ),
      image: require("../../assets/images/ModalImage2.png"), // replace with actual image path
    },
    {
      title: "All That's Left To Do Is...",
      text: (
        <Text>
          Close this guide and send a request of admission to your local clinic.
        </Text>
      ),
      image: require("../../assets/images/ModalImage3.png"), // replace with actual image path
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      Animated.timing(animation, {
        toValue: -25,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep + 1);
        animation.setValue(0);
      });
    } else {
      handleTourCompleted();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      Animated.timing(animation, {
        toValue: 25,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentStep(currentStep - 1);
        animation.setValue(0);
      });
    }
  };

  const handleTourCompleted = async () => {
    try {
      await AsyncStorage.setItem("hasSeenFeatureGuide", "true");
      navigation.navigate("InternalComponents");
    } catch (error) {
      console.error("Failed to save guide completion status.", error);
    }
  };

  return (
    <View style={styles.container}>
      <GradientBorder style={styles.guide}>
        <Animated.View style={{ transform: [{ translateX: animation }] }}>
          <Text style={styles.title}>{steps[currentStep].title}</Text>
          <Image source={steps[currentStep].image} style={styles.image} />
          <Text style={styles.text}>{steps[currentStep].text}</Text>
          {currentStep === 2 && (
            <Text
              style={{
                fontSize: 12,
                color: "#858585",
                textAlign: "center",
              }}
            >
              Remember, whenever your need to streamline appointments, we are
              here to the{" "}
              <Text style={{ fontWeight: "bold", color: "#FFA500" }}>resQ</Text>
            </Text>
          )}
        </Animated.View>
        <View style={styles.buttons}>
          {currentStep < steps.length - 1 ? (
            <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleTourCompleted}
              style={styles.nextButton}
            >
              <Text style={styles.buttonText}>Continue to Dashboard</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.indicatorContainer}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentStep === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>
      </GradientBorder>
      <View
        style={{
          display: "flex",
          width: 300,
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 40,
        }}
      >
        {currentStep > 0 && (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        )}
        {currentStep < steps.length - 1 && (
          <TouchableOpacity
            onPress={handleTourCompleted}
            style={styles.backButton}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  guide: {
    width: 300,
    height: 450,
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#1a1a1a",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 250,
    height: 150,
    resizeMode: "contain",
  },
  title: {
    textAlign: "start",
    width: "100%",
    fontSize: 16,
    color: "#2C9171",
    marginVertical: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#858585",
    textAlign: "left",
    fontWeight: "500",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
  },
  backButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#2C2C2C",
    textAlign: "center",
    paddingVertical: 18,
    borderRadius: 100,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  buttonText: {
    color: "#7F7F7F",
    fontWeight: "bold",
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: "#FFA500",
  },
});

export default FeatureGuide;
