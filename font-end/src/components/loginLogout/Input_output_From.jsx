import React, { useEffect, useState ,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../redux/context/ThemeContext';


//mui
import {BottomNavigation, Box , Button, TextField, Typography, fabClasses, styled} from '@mui/material'
import Alert from '@mui/material/Alert';

const MainBox = styled(Box)(({theme})=>({
    display:'flex' 
    , alignContent:'center' ,
     margin: 'auto'  ,
     marginTop:'20vh' ,
     marginBottom:'20vh',
    borderRadius:'10px',
    boxShadow:' rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
    width:'90vh',
    "@media (max-width : 625px)" :{
        width:'70vh'
    },
    "@media (max-width : 480px)" :{
        width:'50vh'
    },
    "@media (max-width : 350px)" :{
        width:'40vh',
        margin:'20px'
    }
}))


// const TitleBox = styled(Box)`
//     width:40%;
//     height:100%;
//     background:#2874f0;
//   padding:1rem;
//   color:#FFFF;
// `

const LogoBox =styled(Box)`
justify-content: center;
    align-items: center;
    align-items: center;
 left : 50%;
 & > img{
    height : 10vh;
 }
`

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

const Buttons = styled(Button)`
text-transfrom : none;
background : #DB2777;
color : #fff;
heigth:48px;
border-radius:2px;
`

const AlartView = styled(Typography)`
color : red;
font-size:13px;
margin:0px;
padding:0px
`




const Input_output_From = ()=>{
    const {theme , handleOnClickMood} =useContext(ThemeContext);
    const navigate = useNavigate();

    const [mood , setMood ] = useState(theme);
  
    useEffect(()=>{
      theme === 'ligth' ?setMood('ligth') :setMood('dark')
   },[theme])

    useEffect(()=>{
        const auth = localStorage.getItem('User');
    })

    const accounInitaiValue = {
        login : {
            view : "login"
        },
        signup : {
            view : "signup"
        }
    }

    const UsersignupValue = {
        username : '',
        email :'',
        number : '',
        password: ''
    }

    const [account , setAccount] = useState(accounInitaiValue.login);
    const [Usersignup , setUsersignup] = useState(UsersignupValue);
    const [checkAuthType , setCheckAuthType] = useState("");
    const [loder , setLoder] = useState(true);


   
    localStorage.setItem('AuthType' , "");


    const handlenewAccont = ()=>{
        setAccount(accounInitaiValue.signup);
    }

    const handleOnChangeInputValue =(e)=>{
        setUsersignup({...Usersignup , [e.target.name]: e.target.value});
         
    }

     //from validation alrt
     const [UsernameAlart , setUsernameAlart] = useState(false);
     const [emailAlart , setEmailAlart] = useState(false);
     const [numberAlart , setNumberAlart] = useState(false);
     const [passwordAlart , setPasswordAlart] = useState(false);
     const [userFind , setUserFind] = useState(false);

    //sign in
    const usernameValue = document.getElementById('usernameValue');
       const emailValue = document.getElementById('emailValue');
       const numberValue = document.getElementById('numberValue');
       const passwordValue = document.getElementById('passwordValue');

    const careteAccount = async()=>{
       
          
        if(usernameValue.value == ''){
            setUsernameAlart(true);
        }else{
            setUsernameAlart(false);
        }
         if(emailValue.value == ''){
            setEmailAlart(true);
        }else{
            setEmailAlart(false)
        }
        if(numberValue.value == ''){
            setNumberAlart(true);
        }else{
            setNumberAlart(false)
        }
        if(passwordValue.value == ''){
            setPasswordAlart(true);
        }else{
            setPasswordAlart(false)
        }

        
const URL = "https://codershopbackend-838z.onrender.com"

        try{
            let email = emailValue.value;
            let result = await fetch(`${URL}/userFind/${email}`)
                result = await result.json();

                if(result){
                    setUserFind(true) ;
                }
        }catch(error){
            console.log(error);
        }

        //api call --> insert user
         if( usernameValue.value !='' && emailValue.value != '' && numberValue.value != '' && passwordValue.value != ''){
            localStorage.clear("AuthType");
            localStorage.setItem("AuthType" , "signUp");

            let username =usernameValue.value;
            let email = emailValue.value;
            let number = numberValue.value;
            let password = passwordValue.value;

           



          try{
            setLoder(true);
            let result = await fetch(`${URL}/register` , {
                method:"post",
                body:JSON.stringify({username , email , number , password}),
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
            });
            result = await result.json();
            setLoder(false)
            localStorage.setItem('User' , JSON.stringify(result));
            navigate('/');
          }catch(error){
            console.log(error.message)
          }
        }

    }
   

    //log in 

    const [Username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [userExectAlart , setUserExectAlart] = useState(false);

    const handleLoginAccount = async()=>{
        if(Username == ''){
            setEmailAlart(true);
        }else{
            setEmailAlart(false);
        }

        if(password == ''){
            setPasswordAlart(true);
        }else{
            setPasswordAlart(false);
        }

        if(!emailAlart && !passwordAlart){
            try{
                    let result = await fetch(`${URL}/login/${Username}/${password}`);
                    // result = await result.json();
                    if(Object.keys(result).length != 0){
        
                        localStorage.setItem('User' , JSON.stringify(result[0]));
                        navigate('/');
                        setUserExectAlart(false);
                    }else{
                        setUserExectAlart(true);
                    }
                }catch(error){
                    console.log(error.message)
                }
        }
    }



    return(
        <>
            <MainBox style={{ background : mood === 'ligth' ? '#FFFF' : '#1C2833'}}>
                {/* <Box> */}
                    { account.view === 'login' ? <FromBox>
                        <Typography variant="h2" style={{textAlign:'center',  fontFamily: 'cursive' , color : mood === 'ligth' ? 'black' : '#E5E8E8'}}>Log in</Typography>
                        <TextField variant="standard" id='logInEmailID' name="LognInUserName" label="Enter name or email" onChange={(e)=>{setUsername(e.target.value)}} style={{ color : mood === 'ligth' ? 'black' : '#E5E8E8'}} required></TextField>
                        {emailAlart && <AlartView>*enter email</AlartView>}
                        <TextField variant="standard" id='LogInPasswordID' type='password' name='LongINuUserPasssword' label="Enter password" onChange={(e)=>{setPassword(e.target.value)}} required></TextField>
                        {passwordAlart && <AlartView>*enter password</AlartView>}
                        <Typography style={{color:'#2874f0', fontSize:'12px' , marginTop:'1rem' , marginBottom:'1rem'}}>By continuing, you agree to coder-shop's Conditions of Use and Privacy Notice.</Typography>
                        {userExectAlart && <AlartView><Alert severity="error">password or email id is not valid</Alert></AlartView>}
                        <Buttons variant="contained" onClick={()=>setTimeout(handleLoginAccount , 1000)} >log in</Buttons>
                        <Typography style={{textAlign:'center' , padding:'10px 0px'}}>OR</Typography>
                        <Button variant="text" style={{boxShadow:'0px 2px 4px 0px rgb(0 0 0/20%)'}}>Request OTP</Button>
                        <Typography onClick={()=>setTimeout(handlenewAccont  , 1000)}  style={{marginTop:'2rem' , cursor : 'pointer' , textAlign:'center',  color : mood === 'ligth' ? 'black' : '#E5E8E8'}} >New to coder-shop ? Create an account</Typography>
                    </FromBox>
                    :
                    <FromBox>
                        <Typography variant="h2" style={{textAlign:'center',  fontFamily: 'cursive' , color : mood === 'ligth' ? 'black' : '#E5E8E8'}}>Sign Up</Typography>
                        <TextField variant="standard" label="Enter user name" name="username"  id='usernameValue' onChange={handleOnChangeInputValue} style={{marginTop:'0rem'}} required></TextField>
                        {UsernameAlart && <AlartView>*enter name</AlartView>}
                        <TextField variant="standard" label="Enter email" name='email'  id='emailValue' onChange={handleOnChangeInputValue} required></TextField>
                        {emailAlart && <AlartView>*enter email</AlartView>}
                        <TextField variant="standard" type='number' label="Enter number" name='number' id='numberValue' onChange={handleOnChangeInputValue} required></TextField>
                        { numberAlart && <AlartView>*enter number</AlartView>}
                        <TextField variant="standard" type='password' label="Enter password" name='password'  id='passwordValue' onChange={handleOnChangeInputValue} required></TextField>
                        { passwordAlart && <AlartView>*enter password</AlartView>}
                        {userFind && <Alert severity="error"> email is alrady used </Alert>}
                        <Buttons variant="contained" style={{marginTop:'2rem'}}  onChange={handleOnChangeInputValue} onClick={careteAccount}>continue</Buttons>
                    </FromBox>
                    }
                {/* </Box> */}
            </MainBox>
        </>
    )
}

export default Input_output_From;