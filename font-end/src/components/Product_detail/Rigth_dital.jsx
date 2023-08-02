
import React from 'react'

//mui
import {Box, Typography,styled , Divider} from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Style } from '@mui/icons-material';

const Main_Box = styled(Box)(({theme})=>({
    background:'#FFFF',
    margin:'20px 10px',
    padding : '20px 30px',
    "@media (max-width:900px)":{
        padding:'10px 10px'
    }
}))
   

const Name = styled(Typography)(({theme})=>({
    fontSize : '30px',
    fontFamily: 'cursive',
    "@media (max-width: 750px)" :{
      fontSize:'30px'
    }
}))

const Description = styled(Typography)`
    border-bottom:1px solid black;
    padding-bottom : 20px;
`
const Offer_icon = styled(LocalOfferIcon)`
  color: #FE46A5;
  font-size:18px;
`

const Rigth_dital = ({product , mood}) =>{
    return(
        <>
        <Main_Box style = {{background :mood === 'ligth' ? '#fff' : '#1C2833' , color : mood === 'ligth' ? 'black' : '#E5E8E8' }}>
                <Name >{product.name}</Name>
                <Description style={{}}>
                    <Typography style={{fontWeight:'bold' , color:'GrayText', paddingBottom:'5px'}}>Product Description:</Typography>
                    <Typography style={{fontFamily:'sans-serif'}}>{product.description}</Typography>
                </Description>
                <Box style={{display:'flex' , marginTop:'20px'}}>
                    <Box variant="span" style={{marginRight:'10px', fontSize:'30px'}}>₹ {product.disWithPrice}</Box>
                    <Box variant="span" style={{fontSize:'18px' ,textAlign:'baseline' , paddingTop:'13px' , color:'GrayText' , textDecoration: 'line-through'}}> ₹ {product.price}</Box>
                    <Box style={{fontSize:'18px' ,textAlign:'baseline' , paddingTop:'13px' , color:'#FE46A5' ,paddingLeft:'10px'}}>{Math.floor(((product.price-product.disWithPrice)*100)/product.price)} % off</Box>
                </Box>
                <Box>
                    <Typography style={{fontWeight:'bold' , color:'GrayText' , padding:'10px 0px 8px 0px'}}>Exciting Offers:</Typography>
                    <Box>
                        <Typography> <Offer_icon/> Free keychain with all prepaid orders.</Typography>
                        <Typography> <Offer_icon/> 1 Free Plain cap with all prepaid orders above <span style={{color:'#FE46A5'}}>₹549</span>.</Typography>
                        <Typography><Offer_icon/> 1 Free <span style={{color:'#FE46A5'}}>Anonymous Hacker Mask</span>   with all prepaid orders above <span style={{color:'#FE46A5'}}>₹899</span>.</Typography>
                        <Typography><Offer_icon/> Buy 2 get 1 Free and buy 3 get 2 Free on all <span style={{color:'#FE46A5'}}>Caps</span>   - Prepaid orders only.</Typography>
                        <Typography><Offer_icon/> Buy 2 get 1 Free and buy 3 get 2 Free on all <span style={{color:'#FE46A5'}}>Mousepads</span>  - Prepaid orders only.</Typography>
                    </Box>
                </Box>
        </Main_Box>
        </>
    )
}

export default Rigth_dital;