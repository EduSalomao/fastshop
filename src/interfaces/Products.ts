import { Category } from "./Category";

export interface Product {
  id: number;
  created_at: string;
  name: string;
  category_id?: number;
}