import { Annotation } from './../interfaces/Annotation';
import { create } from 'zustand'

interface AppState {
  annotationsData: Annotation[];
  addAnnotation: (annotation: Annotation) => void;
  removeAnnotation: (id: number) => void;
  setAnnotationData: (annotations: Annotation[]) => void;
}

export const useAnnotationStore = create<AppState>((set) => ({
  annotationsData: [],
  addAnnotation: (annotation) =>
    set((state) => ({
      annotationsData: [...state.annotationsData, annotation],
    })),
  removeAnnotation: (id: number) =>
    set((state) => ({
      annotationsData: state.annotationsData.filter(
        (annotation) => annotation.id !== id
      ),
    })),
  setAnnotationData: (annotations) => set({ annotationsData: annotations }),
}));