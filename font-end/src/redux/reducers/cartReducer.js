
const cartReducer = (state , action)=>{
    if(action.type === "ADD_TO_CART"){
        let {product , quantity} = action.payload;
        // console.log(product , quantity)

        let cartProduct;

        cartProduct = {
            id : product.id,
            name :product.name,
            quantity : quantity, 
            smallImg : product.smallImg,
            price : product.price,
            disWithPrice : product.disWithPrice,
            type : product.type,
        }

   return {
    ...state ,
     cart: [...state.cart , cartProduct],
   };
    }
    if(action.type === "REMOVE_ITEM"){
        let update_cart_item = state.cart.filter((cart_item)=>cart_item.id !== action.payload.id);
        return {
            ...state ,
            cart : update_cart_item,
        }
    
    }

    if(action.type === "INCRIMENT_QUANTITY"){
       let update_cart_quntity = state.cart.map((item)=>{
        if(item.id === action.payload.id){
            let incr_quantity = item.quantity + 1;

            return {
                ...item,
                quantity : incr_quantity,
            }
        }else{
            return item;
        }
       })

       return {
        ...state , cart : update_cart_quntity
       }
    }

    if(action.type === "DICRIMENT_QUANTITY"){
        let update_cart_quntity = state.cart.map((item)=>{
         if(item.id === action.payload.id){
             let Dicr_quantity = item.quantity - 1;
 
             return {
                 ...item,
                 quantity : Dicr_quantity,
             }
         }else{
             return item;
         }
        })
 
        return {
         ...state , cart : update_cart_quntity
        }
     }


    return state;
}

export default cartReducer;




