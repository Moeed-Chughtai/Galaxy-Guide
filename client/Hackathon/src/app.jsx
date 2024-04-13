import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Astronaut from './components/Astronaut'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Astronaut text="Hi, I'm from Mars" />
  </React.StrictMode>,
)
