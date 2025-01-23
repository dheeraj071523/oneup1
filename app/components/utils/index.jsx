import styled from "styled-components";

export const CodeupButton = styled.button`
    background-color: #4bf48f;
    color: #000;
    padding: 6px 22px;
    border-radius: 0.375rem;
    border: 1px solid transparent;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    &:hover {
        background-color: #46e083;
        border: 1px solid #40cf79;
    }

    @media (max-width: 375px) {
        padding: 4px 12px;
    }
`;
