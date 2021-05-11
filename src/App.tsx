import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GLobalStyle } from "./styles/global";
import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";



// Acessibilidade.
// Explicita que o modal está por cima da div root
Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsnewTransactionModalOpen] =
    useState(false);

  function handleOpenNewTransactionModal() {
    setIsnewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsnewTransactionModalOpen(false);
  }

  return (
    <>
      {/* header é algo que vai ser repetido em todas as telas criadas */}
      {/* Repasse de funções  */}
      <Header onOpenNewTransactionNewModal={handleOpenNewTransactionModal} />
      <Dashboard />

      {/* Modais são exibidos por cima de todo codigo */}
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <GLobalStyle />
    </>
  );
}
