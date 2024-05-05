import { Product } from '../interfaces/Products';
import { create } from 'zustand'

interface AppState {
  ProductsData: Product[];
  addProducts: (Products: Product) => void;
  removeProducts: (id: number) => void;
  setProductsData: (Productss: Product[]) => void;
}

export const useProductsStore = create<AppState>((set) => ({
  ProductsData: [],
  addProducts: (Product) =>
    set((state) => ({
      ProductsData: [...state.ProductsData, Product],
    })),
  removeProducts: (id: number) =>
    set((state) => ({
      ProductsData: state.ProductsData.filter(
        (Products) => Products.id !== id
      ),
    })),
  setProductsData: (Product) => set({ ProductsData: Product }),
}));