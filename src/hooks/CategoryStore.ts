import { Category } from './../interfaces/Category';
import { create } from 'zustand'

interface AppState {
  CategoryData: Category[];
  addCategory: (category: Category) => void;
  removeCategory: (id: number) => void;
  getCategoryById: (id: number) => Category | undefined;
  setCategoryData: (category: Category[]) => void;
}

export const useCategoryStore = create<AppState>((set) => ({
  CategoryData: [],
  addCategory: (Category) =>
    set((state) => ({
      CategoryData: [...state.CategoryData, Category],
    })),
  removeCategory: (id: number) =>
    set((state) => ({
      CategoryData: state.CategoryData.filter(
        (Category) => Category.id !== id
      ),
    })),
  getCategoryById: (id) => {
    const category = useCategoryStore.getState().CategoryData.find(
      (category) => category.id === id
    );
    return category;
  },
  setCategoryData: (Category) => set({ CategoryData: Category }),
}));