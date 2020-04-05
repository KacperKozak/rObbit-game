import React, { FC } from 'react'
import introVideo from './intro.mp4'
import styled from 'styled-components'
import { Button } from '../../components/Button'

interface IntroProps {
    onEnded(): void
}

export const Intro = ({ onEnded }: IntroProps) => {
    return (
        <Container>
            <Video autoPlay onEnded={onEnded}>
                <source src={introVideo} type="video/mp4" />
            </Video>
            <SkipButton onClick={onEnded}>Skip Intro</SkipButton>
        </Container>
    )
}

const SkipButton = styled(Button)`
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
    margin: auto;
    width: 200px;
    background-color: rgba(0, 0, 0, 0.5);
`

const Container = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
`

const Video = styled.video`
    width: 100%;
    height: 100%;
`
