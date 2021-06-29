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
  transactionsPagination: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  updateTransaction: (transaction: TransactionUpdate) => Promise<void>;
  deleteTransaction: (transaction: TransactionDelete) => Promise<void>;
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
  categoryId?: number;
  category?: Category;
  createdAt: string;
  updatedAt: string;
}

interface TransactionProviderProps {
  children: ReactNode;
}

type TransactionInput = Omit<
  Transaction,
  "id" | "category" | "createdAt" | "updatedAt"
>;
type TransactionUpdate = Omit<
  Transaction,
  "category" | "createdAt" | "updatedAt"
>;
type TransactionDelete = Pick<Transaction, "id">;

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsPagination, setTransactionsPagination] = useState<
    Transaction[]
  >([]);

  // retorna todas as transactions por default
  // offset começa de 0, limit começa de 1
  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));

    api
      .get("transactions1?offset=0&limit=1")
      .then((response) =>
        setTransactionsPagination(response.data.transactions)
      );
  }, []);

  // useEffect(() => {
  //   api
  //     .get("transactions")
  //     .then((response) => setTransactions(response.data.transactions));
  // }, []);

  // API FETCH PAGINATION
  // async function fecthPagination(offset: number, limit: number) {
  //   const response = await api.get(
  //     `transactions1?offset=${offset}&limit=${limit}`
  //   );
  //   const { transaction } = response.data;
  //   setTransactionsPagination(transactions);
  // }

  // API POST
  async function fecthOneCategory(id: number) {
    const response = await api.get(`/categories/${id}`);
    const { category } = response.data;
    return category;
  }
  // API POST
  async function createTransaction(transactionInput: TransactionInput) {
    if (transactionInput.type === "withdraw") {
      transactionInput.amount = transactionInput.amount * -1;
    }

    console.log(transactionInput.categoryId);

    let cat;

    transactionInput.categoryId
      ? (cat = await fecthOneCategory(transactionInput.categoryId))
      : (cat = undefined);

    const response = await api.post("/transaction", {
      //"..." pega todos os atributos de um objeto
      ...transactionInput,
      category: cat,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  // API Patch
  async function updateTransaction(
    transactionInput: TransactionUpdate
  ): Promise<void> {
    if (transactionInput.type === "withdraw") {
      transactionInput.amount = transactionInput.amount * -1;
    }

    let cat;

    transactionInput.categoryId
      ? (cat = await fecthOneCategory(transactionInput.categoryId))
      : (cat = undefined);

    await api.patch(`/transaction/${transactionInput.id}`, {
      //"..." pega todos os atributos de um objeto
      ...transactionInput,
      category: cat,
      updateAt: new Date(),
    });

    await api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }

  // API Patch
  async function deleteTransaction(
    transactionInput: TransactionDelete
  ): Promise<void> {
    await api.delete(`/transaction/${transactionInput.id}`);

    await api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionsPagination,
        createTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
