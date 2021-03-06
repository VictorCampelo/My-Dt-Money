import { FormEvent, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../../assets/close.svg";
import incomeIgm from "../../../assets/income.svg";
import outcomeIgm from "../../../assets/outcome.svg";
import { useTransactions } from "../../../hooks/useTransactions";
import { useCategories } from "../../../hooks/useCategories";
import { Container, RadioBox, TransactionTypeContainer } from "./style";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

// interface Category {
//   id: number;
//   title: string;
//   description: string;
//   createdAt: string;
// }

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { categories } = useCategories();
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [categoryId, setCategoryId] = useState(1);
  const [type, setType] = useState("deposit");

  // handle = ação do usuário
  async function handleCreateNewTransaction(event: FormEvent) {
    // evita de recarregar a pagina quando o modal é fechado
    event.preventDefault();

    // salva, via post, no banco do miragejs, que pode ser mudado para um real posteriomente
    await createTransaction({ title, amount, categoryId, type });

    setTitle("");
    setAmount(0);
    setCategoryId(1);
    setType("deposit");
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          placeholder="Título"
          value={title}
          // sempre que ouver alteração no campo, esse valor sera refletido na variavel title
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => {
              setType("deposit");
            }}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeIgm} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => {
              setType("withdraw");
            }}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeIgm} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <select
          className="select-category"
          value={categoryId}
          onChange={(e) => setCategoryId(parseInt(e.target.value))}
        >
          {categories.map((category) => (
            <option
              key={category.id}
              className="option-input"
              value={category.id}
            >
              {category.title}
            </option>
          ))}
        </select>
        {/* {categories.length > 0 ? (
          <select className="select-category">
            {categories.map((category) => (
              <option className="option-input" value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        ) : (
          <select className="select-category">
            <option className="option-input" value="">
              Sem categias cadastradas
            </option>
          </select>
        )} */}

        {/* <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        /> */}

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
