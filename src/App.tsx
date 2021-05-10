import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GLobalStyle } from "./styles/global";
import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return [
        {
          id: 1,
          title: "transations 1",
          amount: 400,
          type: "deposit",
          category: "Food",
          createdAt: new Date(),
        },
      ];
    });
  },
});

export function App() {
  return (
    <>
      {/* header é algo que vai ser repetido em todas as telas criadas */}
      <Header />
      <Dashboard />
      <GLobalStyle />
    </>
  );
}
