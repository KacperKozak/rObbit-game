import React from 'react'
import styled from 'styled-components'
import { Button } from '../../components/Button'
import intro from './intro.mp4'
import outro from './outro.mp4'
import { BTN_SKIP } from '../../config'

const videos = {
    intro,
    outro,
}

interface IntroProps {
    onEnded(): void
    video: keyof typeof videos
}

export const Video = ({ onEnded, video }: IntroProps) => {
    return (
        <Container>
            <HTMLVideo autoPlay onEnded={onEnded}>
                <source src={videos[video]} type="video/mp4" />
            </HTMLVideo>
            <SkipButton onClick={onEnded}>{BTN_SKIP}</SkipButton>
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

const HTMLVideo = styled.video`
    width: 100%;
    height: 100%;
`
