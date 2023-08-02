import React , {useRef, useContext , useState , useEffect} from "react";



//mui commponets
import {Box} from '@mui/material'

//commponets
import ProductCatagory from '../ProductCatagory/ProductCatagory';
import Carousel_Com from "../Carousel/Carousel_Com";
import Slider from "./Slider";
import Product_list  from './Offered_Product_list'
import Loder from '../loder/Loder';


const Home = ()=>{

    const [loder , setLoder] = useState(true);



 setTimeout(()=>{
    setLoder(false)
 }, 1500)

    return(
        <>
           { 
             loder ? <Loder/> :
             <Box style={{marginTop : '10vh' }}>
                    <ProductCatagory />
                    <Carousel_Com/>
                    {/* <Slider/> */}
                    <Product_list/>
            </Box>}
        </>
    )
}
export default Home;