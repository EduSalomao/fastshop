import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import colors from "../assets/colors/colors";

import { ButtonAdd } from "../components/ButtonAdd";
import { AnnotationsContainer } from "../components/ProductContainer";

export const ListScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.containerAnnotations}>
        <GestureHandlerRootView>
          <AnnotationsContainer />
        </GestureHandlerRootView>
      </View>
      <View style={styles.containerButtonAdd}>
        <ButtonAdd />
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.background,
    width: "100%",
    height: "100%",
  },
  containerButtonAdd: {
    position: "absolute",
    bottom: 15,
    right: 15,
  },
  containerAnnotations: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    marginHorizontal: 10,
    maxHeight: "60%",
    marginTop: 70,
    backgroundColor: colors.background,
  },
});
