import React, { useState, useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import colors from "../assets/colors/colors";
import { create } from "../services/sqlite/Products";
import { useProductsStore } from "../hooks/ProductStore";
import { useCategoryStore } from "../hooks/CategoryStore";

export const AnnotationCreateModal = (props) => {
  const { addProducts } = useProductsStore();
  const { CategoryData } = useCategoryStore();
  const [name, setName] = useState("");
  const [categoryID, setCategoryID] = useState(0);

  const handleAdd = async () => {
    const date = new Date();
    const newProduct = {
      created_at: date.toISOString(),
      name: name,
      category_id: categoryID,
    };
    const id = await create(newProduct);
    addProducts({
      id: id as number,
      ...newProduct,
    });
    setName("");
    setCategoryID(0);
    props.onClose();
  };

  return (
    <View>
      <Modal
        isVisible={props.visible}
        onBackButtonPress={() => props.onClose()}
      >
        <View style={styles.modal}>
          <TextInput
            placeholder="Product name"
            onChangeText={setName}
            value={name}
            style={styles.input}
          />

          <RNPickerSelect
            style={pickerSelectStyles}
            placeholder={{ label: "Selecione uma categoria", value: null }}
            onValueChange={(itemValue: number, itemIndex) => {
              setCategoryID(itemValue);
            }}
            items={CategoryData.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            value={categoryID}
          />

          <TouchableOpacity style={styles.button} onPress={handleAdd}>
            <Text style={styles.buttonText} onPress={handleAdd}>
              Adicionar
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

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
    color: "black",
    paddingRight: 30,
    backgroundColor: "white",
  },
  iconContainer: {
    top: 10,
    right: 12,
  },
  placeholder: {
    color: "gray",
  },
  modalViewTop: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalViewBottom: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
