import React, { useEffect, useState, useContext } from 'react';
import {Link} from 'react-router-dom'
import MyPhoto from './My_Photo.jpg'
import { ThemeContext } from '../../redux/context/ThemeContext';


//mui
import {Box,Typography  , IconButton, styled} from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

//compomets
import Loder from '../loder/Loder'
import Mood from '../Header/Mood';

const MainBox = styled(Box)(({theme})=>({
    display:'flex' ,
     alignContent:'center' ,
     margin: 'auto'  , 
    marginTop:'25vh',
    background:'#FFFF',
    width:'90vh',
    borderRadius:'10px',
    boxShadow:' rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
    marginBottom:'10vh',
    "@media (max-width : 800px)" :{
        marginBottom:'17vh'
    },
    "@media (max-width : 625px)" :{
        width:'70vh'
    },
    "@media (max-width : 480px)" :{
        width:'50vh'
    },
    "@media (max-width : 350px)" :{
        width:'40vh',
    }
}))



const FromBox = styled(Box)`
 display : flex;
 flex-direction : column;
 flex : 1;
 padding : 1rem;
 width:60%;
 & > div , & > button{
    // margin-top : 0.5rem;
 }
`

const Name = styled(Typography)(({theme})=>({
    textAlign:'center', 
     fontFamily: 'cursive',
     fontSize:'50px',
     "@media (max-width:490px) ":{
        fontSize:'30px'
     },
     "@media (max-width:353px) ":{
        fontSize:'25px'
     }
}))

const Imgs = styled(Box)(({theme})=>({
    "img":{
        borderRadius:'50%' ,
         marginLeft:'30%',
         height:'200px'
    },
    "@media (max-width:480px) ":{
        "img":{
            marginLeft:'18%'
        }
     },
    "@media (max-width:355px) ":{
        "img":{
            marginLeft:'25%',
            height:'150px'
        }
     },
    "@media (max-width:345px) ":{
        "img":{
            marginLeft:'20%',
            height:'150px'
        }
     }
}))


const Social_media = styled(Box)(({theme})=>({
    marginLeft:'37%',
    "@media (max-width:345px) ":{
       marginLeft:'30%'
     }
}))




const Content_me = ()=>{
    const {theme } = useContext(ThemeContext);

   const [loder , setloder] = useState(true);
   const [mood , setMood] = useState(theme);

   useEffect(()=>{
      theme === 'ligth' ?setMood('ligth') :setMood('dark')
   },[theme])


   

   

   useEffect(()=>{
    setTimeout(()=>{
        setloder(false);
    }, 1500)
   }, [])

    return(
        <>{ !loder ?
            <MainBox style={{background : mood === 'ligth' ? '#FFFF' : '#1C2833' , color : mood === 'ligth' ? 'black' : '#E5E8E8'}}>
                {/* <Box> */}
                     <FromBox>
                        <Imgs >
                            <img src={MyPhoto}   style={{}}/>
                        </Imgs>
                        <Name  style={{}}>Paresh chaudhary</Name>
                        <Social_media>
                            <Link to={"https://instagram.com/__paresh__2?igshid=MzNlNGNkZWQ4Mg=="} style={{textDecoration:'none' , color:'GrayText'}}>
                                <IconButton  style={{color : mood === 'ligth' ? 'GrayText' : '#E5E8E8'}} >
                                    <InstagramIcon/>
                                </IconButton>
                            </Link>
                            <Link to={"https://github.com/Paresh2578"} style={{textDecoration:'none' , color:'GrayText'}}>
                            <IconButton style={{color : mood === 'ligth' ? 'GrayText' : '#E5E8E8'}}>
                                    <GitHubIcon/>
                                </IconButton>
                            </Link>  
                            <Link to={"http://wa.me/+919327095244"} style={{textDecoration:'none' , color:'GrayText'}}>
                                <IconButton style={{color : mood === 'ligth' ? 'GrayText' : '#E5E8E8'}}>
                                    <WhatsAppIcon/>
                                </IconButton>
                            </Link>    
                        </Social_media>
                    </FromBox>
            </MainBox> :
            <Loder/>
            }
        </>
    )
}

export default Content_me;