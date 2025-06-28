import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home";
import UserLayout from "./Components/Layout/UserLayout";
import {Login} from './Pages/Login'
import {Register} from './Pages/Register'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
        <Route path="login" element={<Login/>}></Route>
        <Route path="register" element={<Register/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
