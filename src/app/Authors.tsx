import React from 'react'
import styled from 'styled-components'
import { AUTHORS } from '../config'
import { shuffleArray } from '../helpers'

export const Authors = () => (
    <>
        <Info>
            <b>Twórcy</b>
        </Info>
        <AuthorList>
            {shuffleArray(AUTHORS).map(({ name, tech }, index) => (
                <li key={index}>
                    <b>{name}</b> {tech}
                </li>
            ))}
        </AuthorList>
        <Info>
            Gra stworzona w ramach Game Jam{' '}
            <a href="https://zostanwdomurobgry.pl">ZostanWDomuRobGry.pl</a>
        </Info>
    </>
)

const Info = styled.p`
    text-align: center;
`

const AuthorList = styled.ul`
    text-align: center;
    list-style: none;
    line-height: 1.4;
`
