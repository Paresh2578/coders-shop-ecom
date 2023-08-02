import { createContext , useContext, useEffect, useReducer, useState } from "react";
import  reducer  from '../reducers/cartReducer'

 const CartContext = createContext();

   const auth = localStorage.getItem('User');


            const getCurrLocalData = ()=>{
               let newlocalData = localStorage.getItem("User_Cart");
               if(newlocalData == null){
                  let cartInfo = localStorage.getItem('User');
                return [];
               }else{
                  return (JSON.parse(newlocalData));
               }
         }


 const initialstate = {
     cart :getCurrLocalData(),
     total_item : "",
     total_amount : ""
    }

 const CartProvider = ({children})=>{
   useEffect(()=>{
      if(auth){
      // getAboveCart();
      }
      }, []);
    const [state , dispatch] = useReducer(reducer , initialstate);
    if(state.cart === null){
      state.cart = [];
    }

    useEffect(()=>{
         localStorage.setItem("User_Cart" ,JSON.stringify(state.cart))
    }, [state.cart])

//add to cart
    const AddTocart = (product , quantity) =>{
        dispatch({type : "ADD_TO_CART" , payload:{product , quantity}})
    }

    //removeItem
    const removeItem = (id)=>{
      dispatch({type:"REMOVE_ITEM", payload:{id}})
    }

    //incrimet quantity
    const Increment_quantity = (id)=>{
      dispatch({type:"INCRIMENT_QUANTITY", payload:{id}});
    }

    //decriment quantity
    const Dicrement_quantity = (id)=>{
      dispatch({type:"DICRIMENT_QUANTITY", payload:{id}});
    }

    return <CartContext.Provider value={{...state , AddTocart, removeItem , Increment_quantity , Dicrement_quantity}}>{children}</CartContext.Provider>
 };

 const useCartContext = ()=>{
    return useContext(CartContext)
 }

 export {CartProvider,  useCartContext}