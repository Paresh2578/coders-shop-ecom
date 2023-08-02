import React from "react";

//mui
import {Box , Button , styled} from "@mui/material";

const MainBox = styled(Box)`
padding : 10px 10px;
background : #ffff;
box-shadow:0px -2px 10px 0 rgb(0 0 0 /10%);
border-top : 2px solid #f0f0f0
`

const Btn_style = styled(Button)`
display : flex;
    margin-left : auto;
    color : #FFFF;
    background:#FE46A5;
    & Buttons : hover {
        background:black;
    }
`

const Place_order = ({mood})=>{
    return(
        <>
        <MainBox style = {{background :mood === 'ligth' ? '#fff' : '#1C2833', color : mood === 'ligth' ? 'black' : '#E5E8E8'}}>
            <Btn_style variant="contained">Place Order</Btn_style>
        </MainBox>
        </>
    )
}

export default Place_order;