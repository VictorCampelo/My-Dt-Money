import { Container } from "./style";

export function TransationsTable (){
    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>Dev site</td>
                        <td className="deposit">R$12000,00</td>
                        <td>Dev</td>
                        <td>20/02/2019</td>
                    </tr>
                    <tr>
                        <td>Dev site</td>
                        <td className="withdraw">-R$12000,00</td>
                        <td>Dev</td>
                        <td>20/02/2019</td>
                    </tr>
                    <tr>
                        <td>Dev site</td>
                        <td className="deposit">R$12000,00</td>
                        <td>Dev</td>
                        <td>20/02/2019</td>
                    </tr>
                    <tr>
                        <td>Dev site</td>
                        <td className="withdraw">-R$12000,00</td>
                        <td>Dev</td>
                        <td>20/02/2019</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    );
}