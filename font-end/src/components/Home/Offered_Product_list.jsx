
import React, {useContext, useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import './Offered_Product_list.css'
import { ThemeContext } from '../../redux/context/ThemeContext';
// import URL from '../getLocalHost'



//mui
import { Grid , Box , styled , Typography} from "@mui/material";

const Bestselling_title = styled(Typography)(({theme})=>({
          fontWeight : 'bold',
        padding :'15px 20px',
        fontSize:'28px',
       fontFamily: 'Manrope',
       paddingBottom:'40px',
       "span":{
        borderBottom:'5px solid #DB2777',
        padding:'4px' ,
         marginBottom:'200px' ,
         borderRadius:'3px',
        fontFamily: 'cursive',
        
       },
       "@media (max-width:400px)":{
        fontSize:'20px'
    }
}))


const Product_img = styled('img')((theme)=>({
    height:'40vh' ,
    width:'40vh',
    marginBottom:'1rem',
    marginTop:'1vh',
    "@media (max-width:590px)":{
        height:'40vh'
    }
}))

const Price_Box = styled(Box)(({theme})=>({
    display:'flex' ,
     marginTop:'10px' , 
     paddingLeft:'4rem',
     "@media (max-width : 590px)":{
        paddingLeft:'10rem'
     },
     "@media (max-width : 545px)":{
        paddingLeft:'8rem'
     },
     "@media (max-width : 435px)":{
        paddingLeft:'5rem'
     },
     "@media (max-width : 330px)":{
        paddingLeft:'3rem'
     },
     "@media (max-width : 290px)":{
        paddingLeft:'2rem'
     }
}))

const Offered_Product_list = ()=>{
    const {theme} = useContext(ThemeContext)

    const [product, setProduct] = useState([]);
    const [smallImg , setSmallImg] = useState(false);
    const [loder , setLoder] = useState(true)
    const [mood , setMood ] = useState(theme);

    useEffect(()=>{
        theme === 'ligth' ?setMood('ligth') :setMood('dark')
     },[theme])

    useEffect(()=>{
            getProduct();
    }, [])
    
    const URL = "https://codershopbackend-838z.onrender.com"
    const getProduct = async()=>{
       try{
        let result = await fetch(`${URL}/getProduct`);
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
       { !loder ?
         <Box style={{background : mood === 'ligth' ? '#f2f2f2' : '#283747 '}}> 
            <Box style = {{background :mood === 'ligth' ? '#fff' : '#1C2833' , marginTop:'10px'}}>
                    <Bestselling_title><span style={{color : mood === 'ligth' ? 'black' : '#E5E8E8' }}>Bestselling Products</span></Bestselling_title>
                </Box>
                <Box>
                    <Grid container spacing={0.0}>
                    {
                            product.filter(item => item.content == "offered").map((data)=>(
                                <Grid  key={data.id} item textAlign={"center"} style = {{background :mood === 'ligth' ? '#fff' : '#1C2833' , marginTop:'10px' ,boxShadow:' rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', borderRadius:'10px' , margin:'10px 0px' , boxSizing:'border-box'}}  className='product' lg={3} md={4} sm={6} xs={12}>
                                    <Link to={`/Product_detail/${data.id}`}  style={{textDecoration :'none' }} >
                                    <Product_img  src={data.bigImg}  style={{ }}></Product_img>
                                    <Box style={{margin:'1rem'}}>
                                        <Typography style={{fontWeight: '700' ,color : mood === 'ligth' ? 'black' : '#E5E8E8' , fontSize:'20px' }}>{(data.name).length >= 17 ? ((data.name).substring(0 , 17) +"...") : (data.name)}</Typography>
                                        <Price_Box style={{}} textAlign={"center"}>
                                                <Box variant="span" style={{marginRight:'10px', fontSize:'25px' , color : mood === 'ligth' ? 'black' : '#E5E8E8' }} >₹ {data.disWithPrice}</Box>
                                                <Box variant="span" style={{fontSize:'18px' ,textAlign:'baseline' , paddingTop:'7px' , color:'GrayText' , textDecoration: 'line-through'}}> ₹ {data.price}</Box>
                                                <Box style={{fontSize:'18px' ,textAlign:'baseline' , paddingTop:'7px' , color:'#FE46A5' ,paddingLeft:'10px'}}>{Math.floor(((data.price-data.disWithPrice)*100)/data.price)} % off</Box>
                                        </Price_Box>
                                        <Typography style={{fontSize:'18px' , color : mood === 'ligth' ? 'black' : '#E5E8E8' }}>{data.type}</Typography>
                                    </Box>
                                </Link>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Box>:""
            }
        </>
    )
}

export default Offered_Product_list;