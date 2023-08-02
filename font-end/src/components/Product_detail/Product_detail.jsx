import React, { useEffect, useState , useContext} from "react"
import { useParams } from "react-router-dom"
import { ThemeContext } from '../../redux/context/ThemeContext';

//componets
import Left_dital  from "./Left_dital"
import Rigth_dital from "./Rigth_dital"
import Loder from '../loder/Loder'

///mui
import {Box, Grid} from '@mui/material'

const Product_detail = ()=>{
 const param = useParams();

  const [product , setProduct] = useState([]);
  const [loder , setLoder] = useState(true);
  const {theme , handleOnClickMood} =useContext(ThemeContext);
  const [mood , setMood ] = useState(theme);

  useEffect(()=>{
    theme === 'ligth' ?setMood('ligth') :setMood('dark')
 },[theme])

 useEffect(()=>{
  setTimeout(getProduct , 1500);
 }, [])

 const URL = "https://codershopbackend-838z.onrender.com"

 const getProduct = async()=>{
    try{
        let result = await fetch(`${URL}/Bye_offered_procuct/${param.id}`)
        result =await result.json();
        setProduct(result);
        setLoder(false);
    }catch(error){
      setLoder(true);
        console.log(error.message);
    }
 }

    return(
        <>
         { !loder ?  <Grid container style={{background : mood === 'ligth' ? '#f2f2f2' : '#283747 '}}>
             <Grid item lg={4} md={4} sm ={8} xs={12}>
               <Left_dital product={product} mood = {mood}/>
             </Grid>
             <Grid item lg={8} md={8} sm={8} xs={12}>
               <Rigth_dital product={product} mood= {mood}/>
             </Grid>
          </Grid> 
          :<Loder/>
          }
        </>
    )
}



export default Product_detail