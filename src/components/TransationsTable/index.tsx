import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./style";

export function TransationsTable() {
  const { transactions } = useTransactions();
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
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
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
          ))}
        </tbody>
      </table>
    </Container>
  );
}
