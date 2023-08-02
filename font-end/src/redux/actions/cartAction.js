
import * as actionType from '../constants/cartConstants'

const URL = "https://codershopbackend-838z.onrender.com"
export const AddTocart = (id ,quantity)=>async (dispatch) =>{
   try{
    let result = await fetch(`${URL}/getOne_product/${id}`);
    result = await result.json();
   dispatch({type : actionType.ADD_TO_CART , payload : {...result , quantity}});

   }catch(error){
   dispatch({type : actionType.ADD_TO_CART_ERROR , payload : error.message});
   }
}


export const removeToCart = (id) =>(dispatch)=>{
  dispatch({type:actionType.REMOVE_TO_CART , payload:id})
}