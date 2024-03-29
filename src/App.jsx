import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LogOut from './pages/LogOut';
import Post from './components/Post/Post';
import './styles/App.css'


const App = () => {
  const { loggedIn, user, token } = useAuthContext()
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/sign-in' element={loggedIn ? <Navigate to='/' /> : <SignIn />} />
        <Route exact path='/sign-up' element={loggedIn ? <Navigate to='/' /> : <SignUp />} />
        <Route exact path='/log-out' element={<LogOut />} />
        <Route exact path='/posts/:id' element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
