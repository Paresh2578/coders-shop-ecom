import React , {useState, useContext , useEffect} from 'react'
import './Login.css'
import {Link , useNavigate} from 'react-router-dom'
import { ThemeContext } from '../../redux/context/ThemeContext';


//componets
import ActionAlerts from '../ActionAlerts';

//mui
import PersonIcon from '@mui/icons-material/Person';
import { Typography , styled  ,Alert} from '@mui/material';

//css
const AlrtBox = styled(Typography)(({theme})=>({
    color:'red',
    marginTop:'-18px',
    marginBottom:'5px',
    paddingLeft:'40px',
    fontSize:'15px',
    "@media (max-width:390px) ":{
        fontSize:'10px'
    }
 }))


const  Forget_password = ()=>{
    const navigate = useNavigate();

    //THEME
    const {theme} = useContext(ThemeContext)
    const [mood , setMood ] = useState(theme);
    useEffect(()=>{
        theme === 'ligth' ?setMood('ligth') :setMood('dark')
     },[theme])


     const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    //alrt
    const [emailAlrt , setEmailAlrt] = useState(false)
    const [passwordAlrt , setPasswordAlrt] = useState(false)
    const [chackUser , setChackUser] = useState(false);
    const [updateAlrtMsg , setUpdateAlrtMsg] = useState(false);
    
    //handleForget_password 
    let clickCount = 0;
   const handleForget_password = async()=>{
            
            //email validation
            if(email.length == 0){
                setEmailAlrt(true);
                setChackUser(false);
            }else{
                setEmailAlrt(false)
            }

            //password validation
            if(password.length == 0){
                setPasswordAlrt(true);
                
            }else{
                setPasswordAlrt(false);
            }

              //password validation
                let passwordPatten = "^[A-Za-z0-9!@#$%^&*]{8,15}$"
                let RPassword = new RegExp(passwordPatten);


                if(RPassword.test(password)){
                    setChackUser(false);
                    setPasswordAlrt(false)
                }else{
                    setPasswordAlrt(true);
                }



            //get user
        if( email.length != 0 && password.length != 0){
            if(clickCount > 0){

                //user email chack
                try{
                    let UserFind_result = await fetch(`https://codershopbackend-838z.onrender.com/userFind/${email}`);
                    UserFind_result = await UserFind_result.json();
                    if(Object.keys(UserFind_result).length > 0){
                        
                        //password update
                        let passWordUpdate_result = await fetch(`https://codershopbackend-838z.onrender.com/forgerPassword/${email}`,{
                            method : "put",
                            body : JSON.stringify({password}),
                            headers : {
                                "Content-Type": "application/json"
                            }
                        })

                        passWordUpdate_result = passWordUpdate_result.json();
                        setUpdateAlrtMsg(true);
                        setChackUser(false);
                        navigate('/Login')
                    }else{
                        setChackUser(true);
                    }
                }catch(error){
                    console.log(error);
                }
                 
               clickCount = 0;
            }
            clickCount++;
        }
   }
    


    return (
        <>
        <div className="container" style={{background : mood === 'ligth' ? '#f2f2f2' : '#283747 '}}>
            <div className="wrapper" style={{ background : mood === 'ligth' ? '#FFFF' : '#1C2833'}}>
                <div className="title"><span>Foreget password </span></div>
                <form>
                {
                    chackUser && <Alert  severity="error" style={{marginBottom:'5px'}}>Worng email id</Alert>
                }    
                <div className="row">
                    <i className="fas fa-user"></i>
                    <input type="text" value={email} placeholder="Email " onChange={(e)=>{setEmail(e.target.value)}} required/>
                </div>
                {
                    emailAlrt && <AlrtBox>* enter email</AlrtBox>
                }
                <div className="row">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="new Password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                {
                    passwordAlrt && <AlrtBox>* password  length greter than 8 to 15</AlrtBox>
                }
                <div className="row button">
                    <input type="button" value="update" onClick={handleForget_password}/>
                </div>
                </form>
            </div>
            </div>
            { 
              updateAlrtMsg ? <ActionAlerts/> : ""
            }    
        </>
    )
}
export default Forget_password;