import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/navbar'
import MyThree from './components/Three'
import Quiz from './components/Quiz'
import './index.css'
import Home from './Home'
import Defend from './components/Defend'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     {/* <Quiz /> */}
     {/* <MyThree /> */}
      <Home />
  </React.StrictMode>,
)
