import React from 'react';
import logo from '../Img/logo.png'
import { Link } from 'react-router-dom';

//mui
import { Typography, Box , styled, Grid, IconButton  } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

//componets
import Loder from '../loder/Loder'
import { useState } from 'react';
import { useEffect } from 'react';


const Main_box = styled(Grid)(({theme})=>({
    display:'flex',
    backgroundColor:'#454545',
    color:'white',
    width:'100%',
    padding :'5px 30px',
    marginTop:'30VH',
    "@media (max-width:800px) ":{
        marginBottom : "50px"
    },
    "@media (max-width:450px) ":{
        padding : '5px 10px'
    },
   

}))

const Logo_Copy_Box = styled(Grid)(({theme})=>({
    display:'flex',
    // width:'80%',

    "div":{
        alignItem :'center',
        justifyContent :'center',
    },
    "@media (max-width:650px) ":{
        display:'block'
      }
}))

const Imgs = styled(Box)(({theme})=>({
    "img":{
        height:'50px',
        float:'center',
        marginRight:'200px'
    },
    "@media (max-width:900px) ":{
      "img" :{
          marginRight:'100px'
      }
    },
    "@media (max-width:800px) ":{
        "img" :{
            marginRight:'50px'
        }
      },
    "@media (max-width:670px) ":{
        "img" :{
            marginRight:'10px'
        }
      },
    "@media (max-width:400px) ":{
        "img" :{
            marginRight:'0px',
            marginLeft:'40%'
        }
      },
    "@media (max-width:315px) ":{
        "img" :{
            marginRight:'0px',
            marginLeft:'25%'
        }
      },
    "@media (max-width:270px) ":{
        "img" :{
            marginRight:'0px',
            marginLeft:'15%'
        }
      }
}))

const Socil_Box = styled(Grid)(({theme})=>({
   display:'flex',
   float:'right',
   marginLeft:'auto',
   paddingTop:'10px',
//    width:'20%'
    "@media (max-width:400px) ":{
        display:'block',
        marginRight:'35%'
    },
    "@media (max-width:315px) ":{
        display:'block',
        marginRight:'45%'
    },
}))

const Copyrigth_name = styled(Box)(({theme})=>({
      "p":{
        fontSize:'20px',
        paddingTop:'10px',
        letterSpacing: '3px',
        wordSpacing: '5px',
        overflowWrap: 'break-word',
      },

      "@media (max-width:750px) ":{
        "p" :{
            fontSize:'15px'
        }
      },
      "@media (max-width:670px) ":{
        "p" :{
            fontSize:'14px'
        }
      },
      "@media (max-width:400px) ":{
        "p" :{
            textalign:'center',
            marginLeft:'40px'
        }
      },
      "@media (max-width:360px) ":{
        "p" :{
            textalign:'center',
            marginLeft:'00px'
        }
      },
      "@media (max-width:315px) ":{
        "p" :{
            textalign:'center',
            marginLeft:'25%'
        }
      },
     
}))


const Footer = ()=>{
     const [loder , setLoder] = useState(true);

    useEffect(()=>{
    setTimeout(()=>{
        setLoder(false);
    }, 2000)
    },[])

    return(
       <>
          {!loder ?
            <Main_box container>
            <Logo_Copy_Box item>
                <Imgs>
                    <img src={logo} alt='..logo'/>
                </Imgs>
                <Copyrigth_name>
                    <Typography >Copyrigth &copy; 2023 coderShop.in </Typography>
                </Copyrigth_name>
            </Logo_Copy_Box>
            <Socil_Box item>
                <Link to={"https://instagram.com/__paresh__2?igshid=MzNlNGNkZWQ4Mg=="} style={{textDecoration:'none' , color:'#fff'}}>
                    <IconButton color={'inherit'}>
                        <InstagramIcon/>
                    </IconButton>
                </Link>
                <Link to={"https://github.com/Paresh2578"} style={{textDecoration:'none' , color:'#FFF'}}>
                    <IconButton color={'inherit'}>
                        <GitHubIcon/>
                    </IconButton>
                </Link>
            </Socil_Box>
           </Main_box>
           : " "
          }
       </>
    )
}

export default Footer