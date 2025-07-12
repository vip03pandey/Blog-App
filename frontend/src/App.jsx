import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home";
import UserLayout from "./Components/Layout/UserLayout";
import {Login} from './Pages/Login'
import {Register} from './Pages/Register'
import FollowingPointerDemo from './Pages/Article'
import ArticleDetails from './Pages/ArticleDetails'
import WriteArticles from './Pages/WriteArticles'
import ProfileLayout from './Components/Layout/ProfileLayout';
import Dashboard from './Pages/Dashboard';
import { Profile } from './Pages/ProfileSideBar';
import UserDetail from './Pages/UserDetail';
import { Toaster } from 'sonner';
import ProtectedRoute from './Components/common/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false}/>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login/>}></Route>
          <Route path="register" element={<Register/>}></Route>
          <Route path='article' element={<FollowingPointerDemo/>}></Route>
          
          {/* Protected route for reading individual articles */}
          <Route 
            path='article/:id' 
            element={
              <ProtectedRoute>
                <ArticleDetails/>
              </ProtectedRoute>
            }
          />
          
          {/* Protected route for writing articles */}
          <Route 
            path='write-article' 
            element={
              <ProtectedRoute>
                <WriteArticles/>
              </ProtectedRoute>
            }
          />
        </Route>
        
        {/* Protected dashboard routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<UserDetail/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App