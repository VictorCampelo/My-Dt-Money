import { createGlobalStyle } from "styled-components";

export const GLobalStyle = createGlobalStyle`
    :root{ //variáveis do css
        --background: #f2f0f5;
        --red: #e52e4d;
        --blue: #5429cc;
        --green: #33cc95;

        --blue-light: #6933ff;

        --text-title: #363f5f;
        --text-body: #969cb3;

        --shape: #ffffff;
    }

    * { //todos os componentes
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    //font-size: 16px default
    html {
        //diminuir o font-size conforme a tela diminui
        @media (max-width: 1080px) {
            font-size: 93.75% //15px //uso de percentual para questões de acessibilidade 
        }

        @media (max-width: 720px) {
            font-size: 87.5% //14px
        }
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased; //torna as fontes mais detalhadas
    }

    //input, textarea e button tem suas proprias fontes, por isso sobreescrever todas
    body, input, textarea, button { 
        //se não for possivel carregar o poppins, use uma font sans-serif qualquer (arial, por exemplo).
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    [disabled] { //todos os componentes desabilitados receberão opacidade e curso não permitido
        opacity: 0.6;
        cursor: not-allowed;
    }

    .react-modal-overlay {
        background: rgba(0, 0, 0, 0.5);

        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-modal-content {
        width: 100%;
        max-width: 576px;
        background: var(--background);
        padding: 3rem;
        position: relative;
        border-radius: 0.24rem;
    }

    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.6)
        }
    }

`