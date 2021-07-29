import logoImg from "../../../assets/logo.svg";
import { Container, Content } from "./style";

interface HeaderProps {
  onOpenNewTransactionNewModal: () => void;
  onOpenNewCategoryNewModal: () => void;
}

export function Header({
  onOpenNewTransactionNewModal,
  onOpenNewCategoryNewModal,
}: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <div>
          <button type="button" onClick={onOpenNewTransactionNewModal}>
            Nova transação
          </button>
          -
          <button type="button" onClick={onOpenNewCategoryNewModal}>
            Nova Categoria
          </button>
        </div>
      </Content>
    </Container>
  );
}
