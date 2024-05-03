import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../routes/InitialRoute";
import { BottomTab } from "../routes/BottomTabNavigator";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../assets/colors/colors";

export const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTab" }],
      } as {
        routes: RootStackParamList[keyof RootStackParamList][];
      });
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#9D0404", "#320F0F"]}
        style={styles.containerGradient}
      >
        <Image
          source={require("../assets/icons/FastShopWithTittle.png")}
          style={{ width: 300, height: 300 }}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerGradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
