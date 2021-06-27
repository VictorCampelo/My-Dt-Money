import { FormEvent, useEffect, useState } from "react";
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
  editTransaction: EditTransaction;
}

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

export function UpdateTransactionModal({
  isOpen,
  onRequestClose,
  editTransaction,
}: NewTransactionModalProps) {
  const { categories } = useCategories();
  const { updateTransaction, deleteTransaction } = useTransactions();

  const [id, setId] = useState(editTransaction.id);

  const [title, setTitle] = useState(editTransaction.title);
  const [amount, setAmount] = useState(editTransaction.amount);
  const [categoryId, setCategoryId] = useState(editTransaction.category?.id);
  const [type, setType] = useState(editTransaction.type);

  useEffect(() => {
    setId(editTransaction.id);
    setTitle(editTransaction.title);
    setAmount(editTransaction.amount);
    setCategoryId(editTransaction.category?.id);
    setType(editTransaction.type);
  }, [editTransaction]);

  console.log(title);

  // handle = ação do usuário
  async function handleUpdateNewTransaction(event: FormEvent) {
    // evita de recarregar a pagina quando o modal é fechado
    event.preventDefault();

    // atualiza, via post, no banco do miragejs, que pode ser mudado para um real posteriomente
    await updateTransaction({ id, title, amount, categoryId, type });

    setTitle(editTransaction.title);
    setAmount(editTransaction.amount);
    setCategoryId(editTransaction.category?.id);
    setType(editTransaction.type);
    onRequestClose();
  }

  // handle = ação do usuário
  async function handleDeleteNewTransaction(event: FormEvent) {
    // evita de recarregar a pagina quando o modal é fechado
    event.preventDefault();

    // atualiza, via post, no banco do miragejs, que pode ser mudado para um real posteriomente
    await deleteTransaction({ id });

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

      <Container>
        <h2>Atualizar Transação</h2>

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

        <div className="bottons-div">
          <button
            type="submit"
            className="update"
            onClick={handleUpdateNewTransaction}
          >
            Atualizar
          </button>
          <button
            type="submit"
            className="remove"
            onClick={handleDeleteNewTransaction}
          >
            Deletar
          </button>
        </div>
      </Container>
    </Modal>
  );
}
