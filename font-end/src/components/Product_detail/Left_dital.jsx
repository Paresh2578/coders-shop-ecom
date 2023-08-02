import React , {useState} from "react";
import { useNavigate , Link } from "react-router-dom";
import { useDispatch } from "react-redux";

//redux
import { useCartContext } from "../../redux/context/cart_context";
//mui
import {Box, Typography , styled , Button, Grid} from '@mui/material'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FlashOn from '@mui/icons-material/FlashOn';

//get paytem files


const Imgs = styled('img')((theme)=>({
    height:'70vh',
    width:'100%',
  borderRadius:'5px',
  "@media (max-width : 900px)" : {
    height:'50vh'
  }

}))
  


const Main_Box = styled(Box)`
// heigth:40vh;
background:#FFFF;
margin : 20px 10px;
padding:5px;
`

const Buttons = styled(Button)`
padding:10px 20px;
margin :10px 5px;
background:#FE46A5;
& Buttons : hover {
    background:DB2777;
}
`

const Left_dital = ({product, mood}) =>{
    const {AddTocart} = useCartContext();
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    let auth = localStorage.getItem('User');

     const [smallImg , setSmallImg] = useState(false);
    let quantity = 1;
     const id = product.id;

    const go_to_cart = ()=>{
        if(auth){
            AddTocart(product , quantity);
            // setTimeout(()=>{
                navigate('/cart')
                // window.location.reload(false);
            // }, 500);
        }else{
            navigate('/logIn')
        }
    }

    const URL = "https://codershopbackend-838z.onrender.com"
   

    return(
        <>
        <Main_Box style = {{background :mood === 'ligth' ? '#fff' : '#1C2833' }}>
            <Box>
                <Imgs src={ smallImg ? product.smallImg : product.bigImg} onMouseOver={()=>setSmallImg(true)} onMouseOut={()=>setSmallImg(false)} alt="alt" stye></Imgs>
            </Box>
            <Box>
                 <Buttons variant="contained" onClick={go_to_cart} refresh="true" style={{}}><LocalGroceryStoreIcon style={{marginRight:'10px'}}/>Add to card</Buttons>
                   <Buttons variant="contained" > <FlashOn style={{marginRight:'10px'}}/>    Buy Now</Buttons>
            </Box>
        </Main_Box>
        </>
    )
}

export default Left_dital;