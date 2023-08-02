import React , {useEffect , useState, useContext} from "react";
import {Link, useParams} from 'react-router-dom'
import { ThemeContext } from "../../redux/context/ThemeContext";

//componets
import Loder from '../loder/Loder'

//mui
import {Box , Typography  , Grid , styled , FormControl , InputLabel , MenuItem , Select} from '@mui/material'

const Heder_Box = styled(Box)(({theme})=>({
    display:'flex',
    "@media (max-width:640px)":{
        display:'block'
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

const Search_Text = styled(Box)(({theme})=>({
    "& > p" : {
        fontSize:'30px',
    },
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:'30%',
    "@media (max-width:395px)" : {
        paddingLeft:'0px'
    }
}))

const Search_product_List = ()=>{

    let param = useParams();
    const {theme} = useContext(ThemeContext)

    const [product , setProduct] = useState([]);
    const [text , setText]= useState(param.name);
    const [loder , setLoder] = useState(true);
    const [mood , setMood ] = useState(theme);

    useEffect(()=>{
        theme === 'ligth' ?setMood('ligth') :setMood('dark')
     },[theme])

    useEffect(()=>{
            setTimeout(getProduct , 1500);
    },[text]);

    const URL = "https://codershopbackend-838z.onrender.com"

        const getProduct = async()=>{
            try{
                let result = await fetch(`${URL}/getProduct`)
                result =await result.json();
                setProduct(result);
                setLoder(false);
            }catch(error){
                setLoder(true)
                console.log(error.message);
            }
         }


         //sorted
         const sort_by_price_ascending = async()=>{
            try{
                let result = await fetch(`${URL}/price_sort_ascending`)
                result =await result.json();
                console.log(param.type);
                setProduct(result);
            }catch(error){
                setLoder(true);
                console.log(error.message);
            }
         }
         const sort_by_price_dscending = async()=>{
            try{
                let result = await fetch(`${URL}/price_sort_dscending`)
                result =await result.json();
                setProduct(result);
            }catch(error){
                setLoder(true)
                console.log(error.message);
            }
         }


    return(
        <>
        {  !loder ?   <Box style={{marginTop:'12vh'}}>
                <Heder_Box >
                    <Search_Text>
                        <Typography style={{textAlign:'center'  ,color : mood === 'ligth' ? 'black' : '#E5E8E8'}}>Search :<span  style={{color:'#DB2777'}}> " {param.name} "</span></Typography>
                    </Search_Text>
                    
                    <Box style={{display : 'flex', marginLeft:'auto' , float:'left' , color:'red'}}>
                            <FormControl sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel id="demo-simple-select-autowidth-label" color="info">fliter</InputLabel>
                                <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                autoWidth
                                label="filter"

                                >
                                <MenuItem value="">
                                </MenuItem>
                                <MenuItem value={10} onClick={sort_by_price_ascending} >sorted by price ascending</MenuItem>
                                <MenuItem value={11} onClick={sort_by_price_dscending} >sorted by price dscending</MenuItem>
                                </Select>
                            </FormControl>
                    </Box>
                </Heder_Box>  
                <Grid container>
                        {
                        product.filter(i=>i.name.toLowerCase().includes(text.toLowerCase())).map((data)=>(
                            <Grid  key={data._id} item textAlign={"center"} style = {{background :mood === 'ligth' ? '#fff' : '#1C2833' , marginTop:'10px' ,boxShadow:' rgba(0, 0, 0, 0.15) 0px 5px 15px 0px', borderRadius:'10px' , margin:'10px 0px' , boxSizing:'border-box'}}  className='product' lg={3} md={4} sm={6} xs={12}>
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
                </Box> : <Loder/>}
        </>
    )
}


export default Search_product_List;