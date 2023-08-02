
import { useState  , useEffect, useContext} from "react";
import { useCartContext } from "../../redux/context/cart_context";
import { ThemeContext } from '../../redux/context/ThemeContext';


//mui
import { Grid , styled ,Box, Typography} from "@mui/material";

//componet
import ViewCart_product from "./ViewCart_product";
import Place_order from "./Place_order";
import Price_details from './Price_details'
import Empty from "./Empty";
import Loder from "../loder/Loder";

const Componet = styled(Grid)(({theme})=>({
      padding : '20px 50px',
      "@media (max-width: 895px)" :{
            padding:'5px'
      }
}))


const CartHeader = styled(Box)`
    background : #ffff;
    padding : 10px 15px;
    margin-top:10px;
    & > p {
      font-size:20px;
      font-weight:550;
    }
`

const Cart = ()=>{
  
  let auth = localStorage.getItem('User');

  const {cart} = useCartContext();
  const [loder , setLoder] = useState(true)
  const {theme , handleOnClickMood} =useContext(ThemeContext);
  const [mood , setMood ] = useState(theme);

  console.log(cart)

  useEffect(()=>{
    theme === 'ligth' ?setMood('ligth') :setMood('dark')
 },[theme])
  
  useEffect(()=>{
    if(auth){
      setTimeout(getCart , 1500)
    }
 }, [])

 const URL = "https://codershopbackend-838z.onrender.com"

 const getCart = async ()=>{
    try{
        let result = await fetch(`${URL}/cart/${JSON.parse(auth)._id}` , {
          method : "put",
          body : JSON.stringify({cart}),
          headers : {
            "Content-Type": "application/json"
          }
        })
        result = await result.json();
        setLoder(false)
    }catch(error){
      setLoder(true)
      console.log(error);
    }
 }


 const [cartItem_size , setCartItem_size] = useState(0);
 const [cartItem , setCartItem] = useState([]);

     
 useEffect(()=>{
    getData();
}, []);

const getData = ()=>{
    if(auth){
       setCartItem_size((JSON.parse(localStorage.getItem("User_Cart"))).length)
       setCartItem(JSON.parse(localStorage.getItem("User_Cart")));
        }
}
  
    return(
        <>
         { !loder ? <Box>
          {
            cart.length== 0 ?
            <Empty/> 
            :

            <Componet container >
            <Grid item lg={8} md={8} sm ={12} xs={12}>
              <CartHeader style = {{background :mood === 'ligth' ? '#fff' : '#1C2833', color : mood === 'ligth' ? 'black' : '#E5E8E8'}}>
                  <Typography style={{}}>My Cart ({cart.length})</Typography>
              </CartHeader>
              <Box>
                {
                  cart.map(product=>(
                <Box key={product.id}>
                  <ViewCart_product product={product} mood = {mood}/>
                </Box>
                  ))
                }
              </Box>
              <Box><Place_order mood = {mood}/></Box>
            </Grid>
            <Grid item lg={4} md={4} sm ={12} xs={12}>
              <Price_details cartItem={cart} mood={mood}/>
            </Grid>

          </Componet>
          }
          </Box> : <Loder/>}
        </>
    )
}

export default Cart;