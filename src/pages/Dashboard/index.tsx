import { Summary } from "../../components/Organisms/Summary";
import { TransationsTable } from "../../components/Organisms/TransationsTable";
import { Container } from "./style";

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <TransationsTable />
    </Container>
  );
}
