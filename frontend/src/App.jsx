import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { UserData } from './context/userContext.jsx'
import Verify from './pages/Verify.jsx'
import Loading from './components/Loading.jsx'
import Products from './pages/Products.jsx'
import Cart from './pages/Cart.jsx'


const App = () => {

  const {isAuth, loading} = UserData()

  return (
    <>
      {
        loading ? (
          <Loading/>
        ) : (
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/products' element={<Products/>}/>
              <Route path='/cart' element={isAuth ? <Cart/> : <Login/>}/>
              <Route path='/login' element={isAuth ? <Home/> : <Login/>}/>
              <Route path='/verify' element={isAuth ? <Home/> : <Verify/>}/>
            </Routes>
            <Footer/>
          </BrowserRouter> 
        )
      }  
    </>
  )
}

export default App
