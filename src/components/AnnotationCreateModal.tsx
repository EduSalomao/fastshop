import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import colors from "../assets/colors/colors";
import { create } from "../services/sqlite/annotations";
import { useAnnotationStore } from "../hooks/AnnotationStore";

export const AnnotationCreateModal = (props) => {
  const { addAnnotation } = useAnnotationStore();

  const [text, onChangeText] = useState("");

  const handleAdd = async () => {
    const date = new Date();
    const newAnnotation = { content: text, created_at: date.toISOString() };
    const id = await create(newAnnotation);
    addAnnotation({
      id: id as number,
      ...newAnnotation,
    });
    onChangeText("");
    props.onClose();
  };

  return (
    <View>
      <Modal
        isVisible={props.visible}
        onBackButtonPress={() => props.onClose()}
        style={{ margin: 0 }}
      >
        <View style={styles.modal}>
          <TextInput
            placeholder="Content"
            onChangeText={onChangeText}
            value={text}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText} onPress={handleAdd}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background,
    width: "100%",
    height: "100%",
    padding: 20,
  },
  text: {
    color: "#FFF",
  },
  input: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    padding: 10,
    borderRadius: 5,
    position: "absolute",
    width: "100%",
    bottom: 30,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
