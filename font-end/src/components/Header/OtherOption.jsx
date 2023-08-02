import React, { useEffect, useState , useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import { useCartContext } from "../../redux/context/cart_context";
import { ThemeContext } from '../../redux/context/ThemeContext';



import {Button ,Box , Badge, IconButton} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';


import styled from '@emotion/styled';

// componets
import User from './User';
import MenuItem from './MenuItem';




//styled

const ButtonStyle = styled(Button)`
    color : #2874f0;
    background : #fff;
    border-radius : 2px;
    height : 30px;
    shadow : none;
    font-weight : bold
    align : center;
    padding:0px 30px;
`

const MainBox = styled(Box)`
      color : #fff;
     display : flex;
     margin : 0 auto 0 auto;
     & > button , & > p , & > div{
        margin-right : 45px;
        font-size : 18px;
        align-items : center
     }
`

const ShoppingCart_Box= styled(Box)(({theme})=>({
  padding:'0px 60px',
  "@media (max-width:730px)":{
    padding:'0px 50px'
  },
  "@media (max-width:650px)":{
    padding:'0px 40px'
 },
 "@media (max-width:565px)":{
  padding:'0px 30px'
 },
 "@media (max-width:490px)":{
  padding:'0px 20px'
 },
 "@media (max-width:410px)":{
  padding:'0px 10px'
 },
 "@media (max-width:350px)":{
  padding:'0px -60px 0px 0px'
}
}))

const OtherOption = ()=>{
  //usercontext
  const {cart} = useCartContext();
  console.log(cart.length)
    
    //find scrren width
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
      ]);
    
      useEffect(() => {
        const handleWindowResize = () => {
          setWindowSize([window.innerWidth]);
        };
    
        window.addEventListener('resize', handleWindowResize);
    
        return () => {
          window.removeEventListener('resize', handleWindowResize);
        };
      }, []);

      const {theme } = useContext(ThemeContext);
      const navigate = useNavigate();

      const [mood , setMood] = useState(theme);
   
      useEffect(()=>{
         theme === 'ligth' ?setMood('ligth') :setMood('dark')
      },[theme])


    let auth = localStorage.getItem('User');

     const handleOnclick = ()=>{
        navigate('/Login')
     }

     const [cartItem_size , setCartItem_size] = useState(0);
    
     useEffect(()=>{
        getData();
    }, [cart]);

    const getData = ()=>{
        if(auth){
           setCartItem_size(cart.length)
            }
    }


    const handleCartOnClick = ()=>{
      let auth = localStorage.getItem('User');

      if(auth){
        navigate('/cart')
      }else{
        navigate('/logIn')
      }
    }

    return(
        <>
        <MainBox id="MainBox" style={{justifyContent:'space-between'}}>
            {auth ? <User user={true}/> : (windowSize[0]<1000 ? 
             <User user={false}/>
                 : 
                 <ButtonStyle variant='con13tained' id='BtnStyle' style={{marginTop:'7px', background : mood === 'ligth' ? '#FFFF' : '#1C2833' }} onClick={handleOnclick}>login</ButtonStyle>)}
                {windowSize[0]>800 ? <Box style={{display:'flex'}} onClick={handleCartOnClick}>
                    <Badge  badgeContent={cartItem_size} color="secondary">
                     <Tooltip title="cart"> 
                        <IconButton style={{color : mood === 'ligth' ? 'inherit' : '#1C2833'}}>
                        <ShoppingCartIcon />
                        </IconButton>
                     </Tooltip> 
                    </Badge >
                </Box> :
                <ShoppingCart_Box style={{display:'flex'}} onClick={handleCartOnClick}>
                    <Badge  badgeContent={cartItem_size} color="secondary">
                      <Tooltip title="cart">
                        <IconButton style={{color : mood === 'ligth' ? 'inherit' : '#1C2833'}}>
                        <ShoppingCartIcon />
                        </IconButton>
                       </Tooltip>  
                    </Badge >
                </ShoppingCart_Box>
                }
                
        </MainBox>
        </>
    )
}

export default OtherOption;