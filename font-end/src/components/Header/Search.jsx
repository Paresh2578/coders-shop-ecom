import React  ,{ useEffect, useState , useContext} from 'react';
import { ThemeContext } from '../../redux/context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import '../ProductCatagory/ProductCatagory.css'
import './Search.css'

//MUI
import {Box , InputBase , styled , List , ListItem, Grid, ListItemButton, IconButton} from '@mui/material';
import {GifBoxOutlined, SearchRounded} from '@mui/icons-material';
import WestIcon from '@mui/icons-material/West';

const SearchBox = styled(Box)`
  background : #fff;
  width :90%;
  border-radius : 2px;
  color : blue;
  displAy:flex;
`

const InputBaseStyle = styled(InputBase)`
    width : 100%;
    padding-left : 1rem;
`

const SearchIconStyle = styled(Box)`
      color : #2874f0;
      margin-right: 5px;
      align : center
       `

 const SearchOutput = styled(List)`
    position:absolute;
    backdround:black;
    // padding:2px 10px;
    border-radius:2px;
 `


  const Mobile_search_Box = styled(Box)(({theme})=>({
    marginTop:'6rem' , 
    marginBottom:'68vh'
  }))


const Search = ()=>{
  const navigate = useNavigate();
  const {theme , handleOnClickMood} =useContext(ThemeContext);

  const [mood , setMood ] = useState(theme);

  useEffect(()=>{
    theme === 'ligth' ?setMood('ligth') :setMood('dark')
 },[theme])


  //find scrren width
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const [text , setText] = useState('');
  const [product , setProduct] = useState([]);
   
  useEffect(()=>{
      getProduct();
      
  },[])

  const URL = "https://codershopbackend-838z.onrender.com"

  const getProduct = async ()=>{
    try{
      let result = await fetch(`${URL}/getProduct`);
      result = await result.json();
      setProduct(result);
    }catch(error){
      console.log(error.massage);
    }
  }

    const Serch_Btn_click = ()=>{
      console.log("done")
      navigate(`/search_product/${text}`);
      setText('')
    }

    
    useEffect(()=>{
    let InpuBox = document.getElementById('InpuBox');
    InpuBox.addEventListener("keypress",handleEnterKey)
    },[])

  const handleEnterKey =(event)=>{
 if(event.key == "Enter"){
  event.preventDefault();
  document.getElementById('search_btn').click();
  // window.location.reload(false);
 }
  }

    return(
            <>
             {windowSize[0]>800 ? <Box style={{width : '100%'}} >
               <Box style={{display:'flex'}}>
                <SearchBox style={{marginRight:'0rem' , marginTop:'7px' , background : mood === 'ligth' ? '#FFFF' : '#1C2833', color : mood === 'ligth' ? 'black' : '#FFFF'}}>
                
                  <InputBaseStyle id='InpuBox' value={text} onChange={(e)=>setText(e.target.value)} placeholder='search products , brand and more' color= "green"></InputBaseStyle>
                  <Box onClick={()=>Serch_Btn_click()} id='search_btn' style={{background:'#2874f0', color:'#FFFF', cursor :'pointer'}}>
                      <SearchRounded  style ={ {marginRight : '10px', marginLeft:'10px' }}/>
                  </Box>
                </SearchBox>
               
              </Box> 
             {
              text && 
                  <Box style={{marginTop:'0.5rem' }}>

                  <SearchOutput style={{background:'#FFFFFF'}}>
                    {
                      product.filter(i=> i.name.toLowerCase().includes(text.toLowerCase())).map((item)=>(
                        
                          <ListItem key={item.id}>
                            <ListItemButton>
                              <SearchRounded style={{paddingRight:'3px'}}/>
                              <Link  to={`/Product_detail/${item.id}`} onClick={()=>setText('')} style={{textDecoration:'none' , color:'#000'}}>{item.name}</Link>
                            </ListItemButton>
                           
                        </ListItem>
                      ))
                    }
                  </SearchOutput>
                </Box>
             }
            </Box> :
              <Mobile_search_Box style={{}} >
              <Box style={{display :  'flex'}}>  
                <Box>
                  <IconButton onClick={()=>navigate('/')} style={{ color : mood === 'ligth' ? 'black' : '#FFFF'}}><WestIcon/></IconButton>
                </Box>
                <Box  width={1000} style={{marginLeft:'0.1vh', marginRight:'1rem'}}>
                  <SearchBox style={{width:'100%' ,marginRight:'10rem'}}>
                     <InputBaseStyle id='InpuBox' value={text} onChange={(e)=>setText(e.target.value)} placeholder='search products , brand and more'></InputBaseStyle>
                    <Box onClick={()=>Serch_Btn_click()} id='search_btn' style={{background:'#2874f0', color:'#FFFF', cursor :'pointer'}}>
                      <SearchRounded  style ={ {marginRight : '10px', marginLeft:'10px' }}/>
                    </Box>
                  </SearchBox>
                </Box> 
              </Box>  
            {
            text && 
                <Box>
                <SearchOutput style={{background:'#FFFFFF', margin:'0px 20px 30px 20px' , padding:'0px'}}>
                  {
                    product.filter(i=> i.name.toLowerCase().includes(text.toLowerCase())).map((item)=>(
                      
                        <ListItem key={item.id}>
                          <ListItemButton>
                            <SearchRounded style={{paddingRight:'10px'}}/>
                            <Link  to={`/Product_detail/${item.id}`} onClick={()=>setText('')} style={{textDecoration:'none' , color:'#000'}}>{item.name}</Link>
                          </ListItemButton>
                          
                      </ListItem>
                    ))
                  }
                </SearchOutput>
              </Box>
            }
           </Mobile_search_Box>
            }
            </>
    )
}


export default Search;