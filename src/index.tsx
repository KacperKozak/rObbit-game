import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './styles/global.css'
import { App } from './app/App'

ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root'),
)
