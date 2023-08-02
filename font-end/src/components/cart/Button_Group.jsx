import React, { useState  } from 'react';
import { useCartContext } from '../../redux/context/cart_context';


//mui
import { ButtonGroup, Button } from '@mui/material';
import styled from '@emotion/styled';
import { getValue } from '@testing-library/user-event/dist/utils';

const ButtonStype = styled(Button)`
   border-radius : 50%;
   width:10px;
`

const Button_Group = ({product})=>{
    let {Increment_quantity ,Dicrement_quantity } = useCartContext();
    const [quantity , setQuantity] = useState(product.quantity);
    
    const increment = ()=>{
        setQuantity(quantity+1);
        Increment_quantity(product.id);
    }
    const decriment = ()=>{
        setQuantity(quantity-1);
        Dicrement_quantity(product.id);
        // window.location.reload(false);
    }

    return(
        <ButtonGroup  variant="outlined" size="small" aria-label="outlined button group" style={{marginTop:'5px'}}>
            <ButtonStype onClick={decriment} disabled={quantity<=1 ? true:false}>-</ButtonStype>
            <Button disabled>{product.quantity}</Button>
            <ButtonStype onClick={increment}>+</ButtonStype>
         </ButtonGroup>
    )
}

export default Button_Group;