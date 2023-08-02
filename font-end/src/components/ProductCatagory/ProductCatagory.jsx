import React, { useEffect , useState, useContext } from 'react'
import './ProductCatagory.css'
import {Link} from 'react-router-dom'
import { ThemeContext } from '../../redux/context/ThemeContext'


//mui
import  {Box, Typography} from '@mui/material'
import styled from '@emotion/styled'

//componets
import Loder from '../loder/Loder'

const MainBox = styled(Box)`
    display : flex
    // margin : '0 100px 0 100px';

`

const Imgs = styled('img')(({theme})=>({
    height : '25vh',
    borderRadius:'10px',
    margin : '10px',
    "@media (max-width:625px)":{
        height:'20vh'
    }
}))

const NavbarMainBox = styled(Box)`
  display: flex;
justify-content:space-between;
background :#fff;
 /* padding:1vh 10vh; */
 overflow-X:scroll;
`


// const 

const ProductCatagory = ()=>{

    const {theme} = useContext(ThemeContext);
    
    useEffect(()=>{
        get_ProductCatagory();
    },[])
    const [product, setProduct] = useState([]);
    const [loder, setLoder] = useState(true)
    const [mood , setMood] = useState(theme);

    useEffect(()=>{
        theme === 'ligth' ? setMood('ligth') :setMood('dark')
     },[theme])

    
const URL = "https://codershopbackend-838z.onrender.com"

    const get_ProductCatagory = async()=>{
           try{
            let result = await fetch(`${URL}/get-productCatagory`);
            result =await result.json();
           setProduct(result);
           setLoder(false);
           }catch(error){
            setLoder(true);
            console.log(error.message)
           }
    }

  

    return(
       <>
      {     
         loder ? <Loder/>
             :
             <MainBox style={{background : mood === 'ligth' ? '#f2f2f2' : '#283747', padding : '2vh 0'}}>
                <NavbarMainBox   id="NavbarMainBox" style={{background : mood === 'ligth' ? '#fff' : '#1C2833'}}>
                {
                    product.map((data , index)=>(
                        <Link to={`/Product_list/${data.type}`} key={index}>
                        <Imgs className='catagory_item' src={data.url} alt='data'></Imgs>
                        {/* <Typography style={{textAlign:'center'}} >{data.type}</Typography> */}
                    </Link>
                    ))
                }
                </NavbarMainBox>
                 </MainBox>   
      }
        </>
    )
}

export default ProductCatagory;