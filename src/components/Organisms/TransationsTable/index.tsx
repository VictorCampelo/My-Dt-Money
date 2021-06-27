import { useState } from "react";
import { useTransactions } from "../../../hooks/useTransactions";
import { UpdateTransactionModal } from "../../Molecules/UpdateTransactionModal";
import { Container } from "./style";

interface Category {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

interface EditTransaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  categoryId?: number;
  category?: Category;
  createdAt: string;
}

const initalTransaction = {
  id: 1,
  title: "",
  amount: 0,
  type: "",
  createdAt: "",
};

export function TransationsTable() {
  const { transactions } = useTransactions();

  const [isUpdateTransationModalOpen, setIsUpdateTransationModalOpen] =
    useState(false);

  const [transactionObject, setTransactionObject] =
    useState<EditTransaction>(initalTransaction);

  function handleOpenUpdateTransactionModal(data: any) {
    // setTransactionObject(e.target.getAttribute("data-item"));
    // console.log(e.target.getAttribute("data-item"));
    let index = data.currentTarget.getAttribute("data-item");
    console.log(transactions[index]);
    setTransactionObject(transactions[index]);
    console.log(transactionObject);
    setIsUpdateTransationModalOpen(true);
  }

  function handleCloseUpdateTransactionModal() {
    setIsUpdateTransationModalOpen(false);
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction, index) => {
            return (
              <tr
                key={transaction.id}
                data-item={index}
                onClick={handleOpenUpdateTransactionModal}
              >
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(transaction.amount)}
                </td>
                {/* {transaction.category.map((cat) => {
                return <td key={cat.id}>{cat.title}</td>;
              })} */}
                {transaction.category !== undefined && (
                  <td>{transaction.category.title}</td>
                )}
                <td>
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(transaction.createdAt)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <UpdateTransactionModal
        isOpen={isUpdateTransationModalOpen}
        onRequestClose={handleCloseUpdateTransactionModal}
        editTransaction={transactionObject}
      />
    </Container>
  );
}
