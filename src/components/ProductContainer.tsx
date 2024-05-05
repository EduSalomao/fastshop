import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { AnnotationCard } from "./ProductCard";
import { useProductsStore } from "../hooks/ProductStore";
import { Product } from "../interfaces/Products";
import { Category } from "../interfaces/Category";
import { all as allProducts } from "../services/sqlite/Products";
import { all as allCategories } from "../services/sqlite/Categorys";
import { find as findCategory } from "../services/sqlite/Categorys";

export const AnnotationsContainer = () => {
  const annotationsData = useProductsStore((state) => state.ProductsData);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await allProducts();
      useProductsStore.getState().setProductsData(products as Product[]);

      const allCategory = await allCategories();
      setCategories(allCategory as Category[]);
    };

    fetchData();
  }, []);

  const getCategoryColor = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : null;
  };

  return (
    <FlatList
      data={annotationsData}
      renderItem={({ item }) => {
        const categoryColor = getCategoryColor(item.category_id);
        console.log(item.category_id);
        return (
          <AnnotationCard
            productName={item.name}
            id={item.id}
            categoryColor={categoryColor}
          />
        );
      }}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
