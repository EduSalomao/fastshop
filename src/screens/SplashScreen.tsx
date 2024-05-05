import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../routes/InitialRoute";
import { LinearGradient } from "expo-linear-gradient";
import { useCategoryStore } from "../hooks/CategoryStore";
import { Category } from "../interfaces/Category";
import { all } from "../services/sqlite/Categorys";

export const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const { setCategoryData } = useCategoryStore();

  useEffect(() => {
    const loadCategories = async () => {
      const categories = (await all()) as Category[];
      await setCategoryData(categories);
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomTab" }],
      } as {
        routes: RootStackParamList[keyof RootStackParamList][];
      });
    };

    loadCategories();
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
