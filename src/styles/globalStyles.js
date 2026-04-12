import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;

        font-family: "Plus Jakarta Sans", sans-serif;
        font-optical-sizing: auto;
    }

    :root {
        font-size: 62.5%;

        --white: #ffffff;
        --white-bg: #fcfdfcff;
        --gray: #6b7280;
        --black: #181f25;
        --standard-green: #2ea07e;
        --lighter-green: #41ad8b;
    }

    body {
        background-color: var(--white-bg);
    }
`;

export const Title = styled.h1 `
    color: var(--black);
    font-size: 2.4rem;
    font-weight: bold;
`;

export const SubTitle = styled.p`
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--gray);
`;

export const IconBox = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 4.8rem;
    height: 4.8rem;

    border-radius: 1.2rem;
    background-color: var(--standard-green);

    color: var(--white);
`;
