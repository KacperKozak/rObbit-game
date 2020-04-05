import styled from 'styled-components'

export const Button = styled.button`
    background: none;
    color: rgba(205, 236, 255, 0.7);
    font-size: 14px;
    border: 1px solid currentColor;
    padding: 10px 20px;
    margin: 4px;
    border-radius: 4px;
    text-transform: uppercase;
    display: inline-block;
    cursor: pointer;

    &:hover {
        background-color: rgba(205, 236, 255, 0.2);
    }

    small {
        display: block;
        font-size: 10;
        text-transform: uppercase;
        margin-top: 2px;
    }
    strong {
        font-size: 27px;
    }
`

export const ButtonBlock = styled.div`
    display: inline-block;
    ${Button} {
        display: block;
        margin-top: 6px;
    }
`
