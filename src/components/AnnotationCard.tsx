import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import colors from "../assets/colors/colors";
import { useAnnotationStore } from "../hooks/AnnotationStore";
import { remove } from "../services/sqlite/annotations";

export const AnnotationCard = (props) => {
  const [swipedLeft, setSwipedLeft] = useState(false);

  const handleSwipe = () => {
    setSwipedLeft(true);
    useAnnotationStore.getState().removeAnnotation(props.id);
    remove(props.id);
  };

  const renderLeftAction = (progress, dragX) => {
    return (
      <View
        style={{
          width: "50%",
          height: "100%",
          backgroundColor: "transparent",
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Swipeable
        renderLeftActions={renderLeftAction}
        onSwipeableOpen={handleSwipe}
        onSwipeableWillOpen={handleSwipe}
      >
        <View style={styles.annotationContainer}>
          <Text style={styles.text}>{props.content}</Text>
        </View>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    width: wp("90%"),
    marginBottom: 10,
  },
  text: {
    color: colors.textcolor,
    fontSize: 20,
    marginLeft: 20,
    fontWeight: "bold",
  },
  annotationContainer: {
    display: "flex",
    justifyContent: "center",
    height: hp("10%"),
    borderRadius: 15,
    backgroundColor: "#DFDDDD",
  },
});
