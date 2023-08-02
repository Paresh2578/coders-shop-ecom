import React ,{useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../Img/logo.png'
import { Link } from 'react-router-dom'

//mui
import  {AppBar, Toolbar,styled , Box, Typography , IconButton} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/icons-material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';

//componets
import Search from './Search'
import OtherOption from './OtherOption'
import Mobile_screen_header from './Mobile_screen_header'
import MenuItem from './MenuItem'
import Loder from '../loder/Loder'


const HeaderStayle = styled(AppBar)(({theme})=>({
    background : '#DB2777',
    color:'black',
    "@media (max-width:450px) ":{
    }
}))
  

const Logo = styled(Link)(({theme})=>({
  heigth :'8vh',
  marginRight:'4rem',
  "@media (max-width:1300px) ":{
    // marginTop:'10px',
  },
  "@media (max-width:450px) ":{
    heigth:'0vh'
    // marginTop:'5px',
  }
}))

const LogoImg = styled('img')(({theme})=>({
  height:'8vh' ,
  marginLeft : '4rem',
  "@media (max-width:900px) ":{
    marginLeft:'0rem',
    margin:'1vh 0vh',
    heigth:'0vh'
  },
  "@media (max-width:450px) ":{
    heigth:'0vh',
    marginTop:'5px',
  }
}))
 

   

const Header = ()=>{

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

  const navigate = useNavigate();

  let auth = localStorage.getItem('User');
const [cartItem_size , setCartItem_size] = useState(0);
const [mobile_serch_view , setMobile_serch_view] = useState(localStorage.getItem('Mobile'));
const [loder , setLoder] = useState(true);
    
useEffect(()=>{
   getData();
   setTimeout(()=>{
    setLoder(false);
   }, 1500)
}, []);

  useEffect(()=>{
    setMobile_serch_view(localStorage.getItem('Mobile'))
  },[localStorage.getItem('Mobile')])

const getData = ()=>{
   if(auth){
      setCartItem_size((JSON.parse(localStorage.getItem("User_Cart"))).length)
       }
}


    return(
        <Box>
              { !loder ? <HeaderStayle id="StyleHEader">
                <Toolbar>
                    <Logo to={'/'}>
                        <LogoImg src={logo} alt='logo' style={{}}/>
                    </Logo>
                    {
                      windowSize[0] >= 800 ? <Search/>  : ""
                    }
                    {
                      windowSize[0] >= 800 ? <OtherOption/>  : ""
                    }
                    <MenuItem/>
                </Toolbar>
            </HeaderStayle>:<Loder/> }
            {
              windowSize[0] < 800 ? <Mobile_screen_header/>  : ""
            }
      </Box>
    )
}

export default Header