import React, { useState , useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../redux/context/ThemeContext';

//mui
import {Box, IconButton , Drawer, ListItem, List, Typography, Divider, ListItemButton} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';

//componet
import Mood from './Mood';

const MenuItem = ()=>{
   const {theme } = useContext(ThemeContext);
   const navigate = useNavigate();
   
     const [open , setOpen] = useState(false);
     const [mood , setMood] = useState(theme);

   useEffect(()=>{
      theme === 'ligth' ?setMood('ligth') :setMood('dark')
   },[theme])



     const handlClose = ()=>{
        setOpen(false);
     }
     const handlOpen = ()=>{
        setOpen(true);
     }

     const handleContent_me = ()=>{
        navigate('/Content_me')
        handlClose();
     }

    return(
          <>
            <Box onClick={handlOpen} color={'white'} style={{float : 'right' , marginLeft:'auto'}}>
               <Tooltip title="menu"> 
                  <IconButton style={{color : mood === 'ligth' ? 'inherit' : '#1C2833'}} >
                  <MenuIcon/>
                  </IconButton>
               </Tooltip>   
            </Box>
            <Drawer open={open} onClose={handlClose} >
                <List  >
                    <ListItem style={{paddingLeft:'-20px'}}>
                           <IconButton onClick={handlClose}  style={{color : mood === 'ligth' ? 'inherit' : '#1C2833'}}>
                             <ArrowBackIcon/>
                           </IconButton>
                    </ListItem>
                    <Divider/>
                    <ListItem >
                      <ListItemButton>
                      <Box>
                            <Typography>
                                <Mood/>
                            </Typography>
                        </Box>
                      </ListItemButton>
                    </ListItem>
                    <Divider/>
                     <ListItem  onClick={handleContent_me}>
                        <ListItemButton>
                        about me
                        </ListItemButton>
                     </ListItem>
                </List>
            </Drawer>
         </>   
    )
}

export default MenuItem;