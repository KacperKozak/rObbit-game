import React, { FC } from 'react'
import styled from 'styled-components'

export const Dialog: FC = ({ children }) => {
    return (
        <Container>
            <DialogBG>{children}</DialogBG>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const DialogBG = styled.div`
    background-color: #0b4566;
    padding: 30px 50px;
    border-radius: 4px;
    text-align: center;
`
