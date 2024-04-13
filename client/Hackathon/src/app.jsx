import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/navbar'
import MyThree from './components/Three'
import './index.css'
import Home from './Home'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />

    <MyThree/>
    {/* <Astronaut text="Hi, I'm from Mars" /> */}
  </React.StrictMode>,
)
