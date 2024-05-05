import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import colors from "../assets/colors/colors";
import { AnnotationCreateModal } from "./ProductCreateModal";

export const ButtonAdd = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleButtonClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleButtonClick}>
        <View style={styles.container}>
          <Image
            source={require("../assets/icons/Icon_Add.png")}
            style={{ width: 35, height: 35 }}
          />
        </View>
      </TouchableOpacity>
      <AnnotationCreateModal
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    width: 75,
    height: 75,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#FFF",
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
