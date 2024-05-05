import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../assets/colors/colors";

export const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} >CartScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.textcolor,
    fontSize: 20,
    fontWeight: "bold",
  },
 });