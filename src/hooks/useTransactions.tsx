import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

interface Category {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  categoryId: number;
  category?: Category;
  createdAt: string;
}

interface TransactionProviderProps {
  children: ReactNode;
}

type TransactionInput = Omit<Transaction, "id" | "category" | "createdAt">;

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // retorna todas as transactions por default
  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  // API POST
  async function fecthOneCategory(id: number) {
    const response = await api.get(`/categories/${id}`);
    const { category } = response.data;
    console.log(category);
    return category;
  }
  // API POST
  async function createTransaction(transactionInput: TransactionInput) {
    if (transactionInput.type === "withdraw") {
      transactionInput.amount = transactionInput.amount * -1;
    }

    console.log(transactionInput.categoryId);

    const cat = await fecthOneCategory(transactionInput.categoryId);

    const response = await api.post("/transaction", {
      //"..." pega todos os atributos de um objeto
      ...transactionInput,
      category: cat,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    console.log(transaction);

    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
