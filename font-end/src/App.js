import React , {useState , useEffect} from 'react'
import { BrowserRouter  ,Route ,Routes  } from 'react-router-dom'
import { ThemeContext, themes } from './redux/context/ThemeContext'


//MUI

import {Box} from '@mui/material'

//componets
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Product_detail from './components/Product_detail/Product_detail'
import Product_List from './components/Product_List/Product_list'
import Cart from './components/cart/Cart'
import Register from './components/loginLogout/Input_output_From'
import SearchBar from './components/Header/Search'
import Search_product_List from './components/Product_List/Search_product_List'
import LoadingBar from 'react-top-loading-bar';
import Footer from './components/Footer/Footer'
import Content_me from './components/Content/Content_me'
import Top_scorl from './components/Top_scorl'
import Login from './components/registrationForm/Login'
import SignUp from './components/registrationForm/SignUp'
import Forget_password from './components/registrationForm/Forget_password'
import ActionAlerts from './components/ActionAlerts'



const App = ()=>{

  const [mood , setMood] = useState(localStorage.getItem('Mood'));
  // const [theme , setTheme] = useState(themes.ligth)
  const [theme , setTheme] = useState(themes.ligth)
   
  useEffect(()=>{
    Moods();
  },[localStorage.getItem('Mood')])

  const Moods = ()=>{
    setMood(localStorage.getItem('Mood'))
  }

  const handleOnClickMood = ()=>{
    theme === themes.ligth? setTheme('dark') : setTheme('ligth')
  }

  let auth = localStorage.getItem('User');
  // let artlMsg = localStorage.getItem('Msg');

// console.log(artlMsg);

  return (
      <ThemeContext.Provider value={{theme  , handleOnClickMood}}>
       <BrowserRouter >
       <LoadingBar
        color='#f11946'
        progress={100}
      />
         <Header/>
          <Box style={{marginTop:65}}>
              <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/Product_detail/:id' element={<Product_detail/>}></Route>
                <Route path='/Product_list/:type' element={<Product_List/>}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/Register' element={<Register/>}></Route>
                <Route path='/search' element={<SearchBar/>}></Route>
                <Route path='/search_product/:name' element={<Search_product_List/>}></Route>
                <Route path='/Content_me' element={<Content_me/>}></Route>
                <Route path='/logIn' element={<Login/>}></Route>
                <Route path='/SignUp' element={<SignUp/>}></Route>
                <Route path='/Forget_password' element={<Forget_password/>}></Route>
              </Routes>
          </Box>
        <Footer />
        <Top_scorl/>
        {/* {
          artlMsg ? <ActionAlerts msg={artlMsg}/> : ''
        } */}
    </BrowserRouter>
      </ThemeContext.Provider>
       
  )
}

export default App