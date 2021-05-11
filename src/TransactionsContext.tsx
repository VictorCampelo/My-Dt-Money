import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface TransactionContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => void;
}

export const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData);

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

interface TransactionProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  function createTransaction(transaction: TransactionInput) {
    api.post("/transaction", transaction);
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
}
