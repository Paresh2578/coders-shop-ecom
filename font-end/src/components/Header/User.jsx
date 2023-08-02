import React ,{useState , useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { ThemeContext } from '../../redux/context/ThemeContext';

//mui
import { Box , Menu ,MenuItem , styled} from '@mui/material'
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Tooltip from '@mui/material/Tooltip';

const IconButtons= styled(IconButton)(({theme})=>({
  margin:'0px 00px',
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
  margin:'0px -20px 0px 20px'
}

}))

const User = ({user})=>{

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
  const {theme , handleOnClickMood} =useContext(ThemeContext);
  const [mood , setMood ] = useState(theme);

  useEffect(()=>{
    theme === 'ligth' ?setMood('ligth') :setMood('dark')
 },[theme])


  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

      const heandl_logOut = ()=>{
        handleClose();
        if(user){
          navigate('/')
          localStorage.clear('User');
          // window.location.reload(false);
        }else{
          navigate('/logIn')
        }
        
      }

    return(
        <>
         <Box>
          <Tooltip title="Account">
              <IconButtons
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                style={{color : mood === 'ligth' ? 'inherit' : '#1C2833'}}
              >
                {/* <AccountCircle fontSize={windowSize[0]>350 ?'large' : ''} /> */}
                <AccountCircle />
              </IconButtons>
              </Tooltip>   
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={heandl_logOut}><PowerSettingsNewIcon style={{fontSize:'20px' , paddingRight:'5px'}}/> {user ?"Log Out ":"Log in" }</MenuItem>
              </Menu>
            </Box>
      </>
    )
}

export default User;