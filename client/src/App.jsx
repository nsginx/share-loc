import { io } from 'socket.io-client'
import './App.css'
import { socket } from '../connectSocket'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Share from './pages/Share'
import View from './pages/View'
import Home from './pages/Home'

function App() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={"/"} element={<Home/>}/>
        <Route exact path={'/share'} element={<Share/>}/>
        <Route exact path={'/view/:id'} element={<View/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
