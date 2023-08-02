import React, {useState , useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../redux/context/ThemeContext';

//mui
import  {AppBar, Toolbar,styled , Box, Typography , IconButton} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';

//componets
import OtherOption from './OtherOption';

const MainBox = styled(AppBar)(({theme})=>({
    height:'50px',
    margin:'0px' ,
    padding:'-10px 0px 10px 0px',
    fontSize:'20px',
}))

const IconButtons= styled(IconButton)(({theme})=>({
    margin:'0px 60px',
    "@media (max-width:730px)":{
        margin:'0px 50px'
    },
    "@media (max-width:650px)":{
        margin:'0px 40px'
    },
    "@media (max-width:565px)":{
        margin:'0px 30px'
    },
    "@media (max-width:490px)":{
        margin:'0px 20px'
      },
      "@media (max-width:410px)":{
        margin:'0px 10px'
      },
      "@media (max-width:350px)":{
        margin:'0px 10px 0px 0px'
      }
}))


const Mobile_screen_header = ()=>{
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

      const {theme } = useContext(ThemeContext);
      const navigate = useNavigate();

      const [mood , setMood] = useState(theme);
      const [open , setopen]= useState(false)
   
      useEffect(()=>{
         theme === 'ligth' ?setMood('ligth') :setMood('dark')
      },[theme])
   



    return(
        <>
         <MainBox position="fixed" color="primary" style={{background : '#DB2777'}} sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <Box style={{display :'flex' , justifyContent:'space-between'}}>
                    <Tooltip title="Home"> 
                        <IconButtons style={{color : mood === 'ligth' ? 'inherit' : '#1C2833'}} onClick={()=>navigate('/')}>
                        <HomeIcon fontSize={windowSize[0]>350 ?'large' : ''}/>
                        </IconButtons>
                    </Tooltip> 
                    <Tooltip title="search">    
                        <IconButtons style={{color : mood === 'ligth' ? 'inherit' : '#1C2833'}} onClick={()=>navigate('/search')}>
                        <SearchIcon  fontSize={windowSize[0]>350 ?'large' : ''} />
                        </IconButtons>
                    </Tooltip>    
                        <Box id="OtherOptionStryle">
                           <OtherOption/>
                        </Box>
                    </Box>    
                </Toolbar>
      </MainBox>
        </>
    )
}

export default Mobile_screen_header;