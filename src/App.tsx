import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewCategoryModal } from "./components/NewCategoryModal";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { CategoriesProvider } from "./hooks/useCategories";
import { TransactionsProvider } from "./hooks/useTransactions";
import { GLobalStyle } from "./styles/global";

// Acessibilidade.
// Explicita que o modal está por cima da div root
Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);

  function handleOpenNewCategoryModal() {
    setIsNewCategoryModalOpen(true);
  }

  function handleCloseNewCategoryModal() {
    setIsNewCategoryModalOpen(false);
  }

  return (
    <CategoriesProvider>
      <TransactionsProvider>
        {/* header é algo que vai ser repetido em todas as telas criadas */}
        {/* Repasse de funções  */}
        <Header
          onOpenNewTransactionNewModal={handleOpenNewTransactionModal}
          onOpenNewCategoryNewModal={handleOpenNewCategoryModal}
        />
        <Dashboard />

        {/* Modais são exibidos por cima de todo codigo */}
        <NewTransactionModal
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModal}
        />
        <NewCategoryModal
          isOpen={isNewCategoryModalOpen}
          onRequestClose={handleCloseNewCategoryModal}
        />

        <GLobalStyle />
      </TransactionsProvider>
    </CategoriesProvider>
  );
}
