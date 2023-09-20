import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Register, Home, Add, Profile, Details } from './pages'
import PrivateRouter from './privateRouter'

const App = () => {
  return (

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/" element={<PrivateRouter/>}>
        <Route path='post/add' element={<Add/>}/>
        <Route path='post/edit/:id' element={<Add/>}/>
        <Route path='post/details/:id' element={<Details/>}/>
        <Route path='post/profile' element={<Profile/>}/>
      </Route>


      <Route path='/auth/login' element={<Login/>}/>
      <Route path='/auth/register' element={<Register/>}/>
    </Routes>

     )
}

export default App