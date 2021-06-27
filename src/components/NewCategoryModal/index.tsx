import { FormEvent, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import { useCategories } from "../../hooks/useCategories";
import { Container } from "../NewCategoryModal/style";

interface NewCategoryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewCategoryModal({
  isOpen,
  onRequestClose,
}: NewCategoryModalProps) {
  const { createCategory } = useCategories();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // handle = ação do usuário
  async function handleCreateNewCategory(event: FormEvent) {
    // evita de recarregar a pagina quando o modal é fechado
    event.preventDefault();

    // salva, via post, no banco do miragejs, que pode ser mudado para um real posteriomente
    await createCategory({ title, description });

    setTitle("");
    setDescription("");
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

      <Container onSubmit={handleCreateNewCategory}>
        <h2>Cadastrar Categoria</h2>

        <input
          placeholder="Título"
          value={title}
          // sempre que ouver alteração no campo, esse valor sera refletido na variavel title
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          placeholder="Descrição"
          value={description}
          // sempre que ouver alteração no campo, esse valor sera refletido na variavel title
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
