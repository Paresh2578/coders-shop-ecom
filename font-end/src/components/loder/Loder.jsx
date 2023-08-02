import React from 'react'
import './loder.css'

//mui
import {Box , styled} from '@mui/material'

const MainBox = styled(Box)(({theme})=>({
    // marginLeft:'20vh', 
    // marginTop:'30vh'
    position:'fixed',
    left:'45%',
    top :'40%'
}))

const Loder = ()=>{
    return(
        <MainBox >
        <Box className="lds-roller"><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box><Box></Box></Box>
        </MainBox>
    )
}

export default Loder