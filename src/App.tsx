import { Header } from "./components/Header";
import { GLobalStyle } from "./styles/global";

export function App() {
  return (
    <>
      {/* header é algo que vai ser repetido em todas as telas criadas */}
      <Header /> 
      <GLobalStyle />
    </>
  );
}
