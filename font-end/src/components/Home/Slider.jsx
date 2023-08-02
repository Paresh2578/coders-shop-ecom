import React ,{useEffect , useState}  from 'react'
import { Link } from 'react-router-dom';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import {Box, Typography}  from '@mui/material'
import styled from '@emotion/styled';



const Bestselling_componet = styled(Typography)`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600&display=swap');
font-weight : bold ;
padding :15px 20px;
font-size:28px;
font-family: 'Manrope'
// border-bottom:2px solid #DB2777:
border-bottom: ;
`

const responsive = {

    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  

const  Slider = ()=>{

  useEffect(()=>{
    get_Carousel_product();
})
const [product, setProduct] = useState([]);

const URL = "https://codershopbackend-838z.onrender.com"

const get_Carousel_product = async()=>{
    let result = await fetch(`${URL}/offered_product`);
    result =await result.json();

    setProduct(result);
}


const renderer = ({ hours, minutes, seconds }) => {
      return <Box variant="span">{hours} : {minutes} : {seconds} left   </Box>;
  };

    return(
        <>
        <Box style={{ background:'#f2f2f2' , padding:'10px 10px' , disply:'flex'}}>
            <Box style = {{background :'#ffff'}}>
                <Bestselling_componet><span style={{borderBottom:'5px solid #DB2777' , padding:'4px' , borderRadius:'3px'}}>Bestselling Products</span></Bestselling_componet>
            </Box>
            <Box style = {{background :'#ffff'}}>
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
                            <Box textAlign={"center"} key={data.id}>
                                <Link to={`/Product_detail/${data.id}`} style={{textDecoration :'none'}} >
                                  <img src={data.bigImg} style={{width:'100%' , height:'50vh'}}></img>
                                  <Box style={{margin:'1rem'}}>
                                      <Typography style={{fontWeight: '700' ,color:'black', fontSize:'20px' }}>{(data.name).length >= 25 ? ((data.name).substring(0 , 25) +"...") : (data.name)}</Typography>
                                      <Typography style={{color : '#DB2777' , fontSize:'18px'}} >{Math.floor((((data.price)-(data.disWithPrice))*100)/(data.price))} % off</Typography>
                                      <Typography style={{fontSize:'18px' , color:'black'}}>{data.type}</Typography>
                                  </Box>
                               </Link>
                            </Box>
                        ))
                    }
                </Carousel>
                    </Box>
                    </Box>
        
        </>
    )
}


export default  Slider;