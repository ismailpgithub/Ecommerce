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
import NotFound from './pages/NotFound.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Checkout from './pages/Checkout.jsx'
import Payment from './pages/Payment.jsx'


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
              <Route path='/product/:id' element={<ProductPage/>}/>
              <Route path='/cart' element={isAuth ? <Cart/> : <Login/>}/>
              <Route path='/checkout' element={isAuth ? <Checkout/> : <Login/>}/>
              <Route path='/payments/:id' element={isAuth ? <Payment/> : <Login/>}/>
              <Route path='*' element={<NotFound/>}/>
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
