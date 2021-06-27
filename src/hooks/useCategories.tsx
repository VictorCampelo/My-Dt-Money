import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface Category {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

interface CategoryProviderProps {
  children: ReactNode;
}

interface CategoryContextData {
  categories: Category[];
  createCategory: (category: CategoryInput) => Promise<void>;
  fecthOneCategory: (id: number) => Promise<Category>;
}

type CategoryInput = Omit<Category, "id" | "createdAt">;
// type CategoryFindOne = Omit<Category, "title" | "description" | "createdAt">;

export const CategoriesContext = createContext<CategoryContextData>(
  {} as CategoryContextData
);

export function CategoriesProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  // retorna todas as categories por default e adicion no context
  useEffect(() => {
    api
      .get("categories")
      .then((response) => setCategories(response.data.categories));
  }, []);

  // API FETCH
  async function fecthOneCategory(id: number): Promise<Category> {
    const response = await api.get(`/categories/${id}`);
    const { category } = response.data;
    return category;
  }

  // API POST
  async function createCategory(categoryInput: CategoryInput) {
    const response = await api.post("/categories", {
      //"..." pega todos os atributos de um objeto
      ...categoryInput,
      createdAt: new Date(),
    });
    const { category } = response.data;

    setCategories([...categories, category]);
  }

  return (
    <CategoriesContext.Provider
      value={{ categories, createCategory, fecthOneCategory }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);

  return context;
}
