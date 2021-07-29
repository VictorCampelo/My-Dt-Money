import styled from "styled-components";

export const Container = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  //16px 160px
  padding: 2rem 1rem 12rem; //1 rem = tamanho do font-size do html no globalStyle
  display: flex;
  align-items: center; //deixa os itens alinhando ao centro
  justify-content: space-between; //adicionar um espaço entre a logo e botão

  button {
      font-size: 1rem;
      color: #FFF;
      background: var(--blue-light);
      border: 0;
      padding: 0 2rem;
      border-radius: 0.25rem;
      height: 3rem;

      transition: filter 0.2s;

      &:hover {
          filter: brightness(0.9);
      }
  }
`;
