import Navbar from "./components/Navbar/Navbar";
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom'
import './App.scss'

/* pages */
import ProductDetail_Container  from "./pages/ProductDetail_Container/ProductDetail_Container";
import Categories from './pages/Categories/Categories'
import Contact from './pages/Contact/Contact'
import AboutUs from './pages/AboutUs/AboutUs'
import Cart from './pages/Cart/Cart'
import Help from './pages/Help/Help'
import HomePage from './pages/HomePage/HomePage.jsx'
import Category from './pages/Category/Category'
import Footer from './components/Footer/Footer'
import LogIn from "./pages/LogIn/LogIn";
import SingUp from "./pages/SingUp/SingUp";

import { CartContextProvider } from "./context/CartContext";
import wavesOfHeader from '../src/imgs/Waves-Header.png'
import Header_hompage from "./components/Header_hompage/Header_hompage";
import Checkout from "./pages/Checkout/Checkout";
import { UserContextProvider } from "./context/UserContext/UserContext";
import Page404 from "./pages/404/Page404";
import UploadProduct from "./components/UploadProduct/UploadProduct.jsx";
import Profile from "./pages/Profile/Profile.jsx";

function App() {

  return(
    <BrowserRouter>
      <UserContextProvider>
      <CartContextProvider>
        <header>
          <Navbar />
          <Routes>
            <Route path={'/'} element={ <Header_hompage/>}/>
            <Route path={'/categories'} element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> }/>
            <Route path={'/categories/:idCat'} element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> }/>
            <Route path='/profile' element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> } />
            <Route path='/admin' element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> } />
            <Route path={'/contact'} element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> }/>
            <Route path={'/about_us'} element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> }/>
            <Route path={'/cart'} element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> }/>
            <Route path={'/cart/checkout'} element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> }/>
            <Route path={'/help'} element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> }/>
            <Route path={'/login'} element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> }/>
            <Route path={'/singup'} element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> }/>
            <Route path={'/products/:idItem'} element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> }/>
            <Route path={'*'} element={<img className='waves_Header' src={wavesOfHeader} alt="Borde del header" /> }/>
          </Routes>
        </header> 

        <main>
          <Routes> 
            <Route path='/' element={<HomePage/>} />
            <Route path='/categories' element={<Categories/>} />
            <Route path='/categories/:idCat' element={<Category/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/admin' element={<UploadProduct/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/about_us' element={<AboutUs/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/cart/checkout' element={<Checkout/>} />
            <Route path='/help' element={<Help/>} />
            <Route path='/login' element={<LogIn/>} />
            <Route path='/singup' element={<SingUp />} />
            <Route path='/products/:idItem' element={<ProductDetail_Container />} />
            <Route path='*' element={ <Page404/> } />
          </Routes>
        </main>

        <footer>
            <Footer/>
        </footer>  
      </CartContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App;


