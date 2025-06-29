import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home";
import UserLayout from "./Components/Layout/UserLayout";
import {Login} from './Pages/Login'
import {Register} from './Pages/Register'
import {FollowingPointerDemo} from './Pages/Article'
import ArticleDetails from './Pages/ArticleDetails'
import WriteArticles from './Pages/WriteArticles'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login/>}></Route>
        <Route path="register" element={<Register/>}></Route>
        <Route path='article' element={<FollowingPointerDemo/>}></Route>
        <Route path='article/:id' element={<ArticleDetails/>}></Route>
        <Route path='write-article' element={<WriteArticles/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
