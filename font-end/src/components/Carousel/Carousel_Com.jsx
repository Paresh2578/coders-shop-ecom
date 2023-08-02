import React ,{useEffect , useState, useContext}  from 'react'
import { ThemeContext } from '../../redux/context/ThemeContext';

//mui
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Box , down}  from '@mui/material'
import styled from '@emotion/styled';
// import { makeStyles } from '@mui/styles';

//componets
import Loder from '../loder/Loder'


const Imgs = styled('img')(({theme})=>({
  height:310,
  width:'100%',
  "@media (max-width: 480px)":{
      height:200,
      objectFit:'cover'
  }
}))

const responsive = {

    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }
  

const  Carousel_Com = ()=>{
  const {theme } = useContext(ThemeContext);
  const [mood , setMood] = useState(theme);
  const [product, setProduct] = useState([]);
  const [loder , setLoder] = useState(true);

  useEffect(()=>{
     theme === 'ligth' ?setMood('ligth') :setMood('dark')
  },[theme])


  useEffect(()=>{
    get_Carousel_product();
},[])

const URL = "https://codershopbackend-838z.onrender.com"

const get_Carousel_product = async()=>{
    try{
          let result = await fetch(`${URL}/get-carousel_product`);
          result =await result.json();
          setProduct(result);
          setLoder(false)
    }catch(error){
      setLoder(true);
    console.log(error.massage);
    }
}


    return(
       <>
        {
          !loder ?
           <Box style={{background : mood === 'ligth' ? '#f2f2f2' : '#283747' , padding : '0px 0'}}>
           <Carousel 
           responsive={responsive}
           swipeable={false}
           draggable={false}
           showDots={false}
           infinite={true}
           autoPlay={true}
           autoPlaySpeed={4000}
           keyBoardControl={true}
           // customTransition="all .5"
           transitionDuration={500}
           >
             {
               product.map((data)=>(
                   <Box key={data._id}>
                       <Imgs src={data.bigImg}  style={{heigth:'' , width:'100%'}}></Imgs>
                   </Box>
               ))
             }
         </Carousel>
         </Box> :
         <Loder/>
        }
       </>
    )
}


export default  Carousel_Com;