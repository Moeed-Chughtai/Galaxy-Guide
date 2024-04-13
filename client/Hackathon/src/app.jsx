import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './Home'

import Astronaut from './components/Astronaut'
import MyThree from './components/Three';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    {/* <MyThree/> */}
    <Astronaut text="Hi, I'm from Mars" />

  </React.StrictMode>,
)
