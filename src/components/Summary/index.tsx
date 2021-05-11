import incomeIgm from "../../assets/income.svg";
import outcomeIgm from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { TransactionsContext } from "../../TransactionsContext";
import { Container } from "../Summary/style";
import { useContext } from "react";

export function Summary() {
  const {transactions} = useContext(TransactionsContext)

  console.log(transactions)

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeIgm} alt="Entradas" />
        </header>
        <strong>R$1000,00</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeIgm} alt="Saídas" />
        </header>
        <strong>- R$500,00</strong>
      </div>
      <div className="highlight-green">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>R$500,00</strong>
      </div>
    </Container>
  );
}
