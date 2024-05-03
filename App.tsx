import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { InitialRoute } from "./src/routes/InitialRoute";
import { BottomTab } from "./src/routes/BottomTabNavigator";
import { SplashScreen } from "./src/screens/SplashScreen";

export default function App() {
  return (
    <NavigationContainer>
      <InitialRoute />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
