import React from 'react'
import emtyImg from './empty_img.png'
import { useNavigate } from 'react-router-dom';

//mui
import { Box, Button, Typography , styled} from '@mui/material';

  const Empty_com = styled(Box)(({theme})=>({
    display: 'flex' ,
    flexDirection: 'column',
    justifyontent: 'center',
    alignItems: 'center',
    height: '50vh',
    maxWidth: '500px',
    width: '100%',
    margin: 'auto',
  }))


  const Type_name = styled(Box)(({theme})=>({
    fontSize : '30px',
    "@media (max-width:900px)" :{
         fontSize:'20px'
    }
  }))

  const Main_Box = styled(Box)(({theme})=>({
    background:'#FFFF',
    margin : '25vh 20px 21vh 20px',
    "@media (max-width:250px)" :{
        margin:'100px 10px 25px 10px'
   }
   
  }))


const Empty = ()=>{
    const navigate = useNavigate();

    return(
        <Main_Box style={{}} >
            <Empty_com>
                <img src={emtyImg} height={150} width={150}></img>
                <Type_name style={{}}>Your cart is empty!</Type_name>
                <Typography>Add items to it now.</Typography>
                <Button variant='contained' onClick={()=>navigate('/')} style={{padding:'5px 50px' , marginTop:'1rem' , background:'#FE46A5'}}>Shop now</Button>
            </Empty_com>
       </Main_Box>
    )
}

export default Empty;