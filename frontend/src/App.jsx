import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { UserData } from './context/userContext.jsx'
import Verify from './pages/Verify.jsx'


const App = () => {

  const {} = UserData()

  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verify' element={<Verify/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>   
    </>
  )
}

export default App
