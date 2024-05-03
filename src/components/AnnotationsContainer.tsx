import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";

import colors from "../assets/colors/colors";
import { AnnotationCard } from "./AnnotationCard";
import { useAnnotationStore } from "../hooks/AnnotationStore";
import { Annotation } from "../interfaces/Annotation";
import { all } from "../services/sqlite/annotations";

export const AnnotationsContainer = () => {
  const annotationsData = useAnnotationStore((state) => state.annotationsData);

  useEffect(() => {
    const fetchData = async () => {
      const data = await all();
      useAnnotationStore.getState().setAnnotationData(data as Annotation[]);
    };
    fetchData();
  }, []);

  return (
    <FlatList
      data={annotationsData}
      renderItem={({ item }) => {
        return <AnnotationCard content={item.content} id={item.id} />;
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
