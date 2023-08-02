


import React, { useState , useEffect , useContext } from 'react'
import {Link , useNavigate} from 'react-router-dom'
import { ThemeContext } from '../../redux/context/ThemeContext';

//mui
import { Typography , Alert , styled } from '@mui/material'
import { Flag } from '@mui/icons-material'


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

//main function
const SignUp  = ()=>{
    const navigate = useNavigate();

    //theme
    const {theme} = useContext(ThemeContext)
    const [mood , setMood ] = useState(theme);
    useEffect(()=>{
        theme === 'ligth' ?setMood('ligth') :setMood('dark')
     },[theme])

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [number , setNumber] = useState('')
    const [password , setPassword] = useState('')

    //alrt
    const [nameAlrt , setNameAlrt] = useState(false)
    const [emailAlrt , setEmailAlrt] = useState(false)
    const [numberAlrt , setNumberAlrt] = useState(false)
    const [passwordAlrt , setPasswordAlrt] = useState(false)

    //alrady user register checked
    const [userFind  , setUserFind] = useState(false);



   let clickCount = 0;

    const handleSignUp = async()=>{
        //name validation
        if(name.length < 4){
            setNameAlrt(true);

        }else{
            setNameAlrt(false);
        }

        //email validation
        let emailPatten = "^[a-z0-9]{1,20}@gmail\\.com$"
        let rEmail = new RegExp(emailPatten);

        if(rEmail.test(email)){
            setEmailAlrt(false);
        }else{
            setEmailAlrt(true)
        }

        //password validation
        let passwordPatten = "^[A-Za-z0-9!@#$%^&*]{8,15}$"
        let RPassword = new RegExp(passwordPatten);


        if(RPassword.test(password)){
             setPasswordAlrt(false)
        }else{
            setPasswordAlrt(true);
        }

        //mobile number validation
        let numberPatten = "^[0-9]{10}$"
        let RNumber = new RegExp(numberPatten);
         
        if(RNumber.test(number)){
            setNumberAlrt(false);
        }else{
            setNumberAlrt(true);
        }

     //post user ditil
      if(name.length != 0 && email.length != 0 && password.length != 0 && number.length != 0){
        if(!nameAlrt && !emailAlrt && !passwordAlrt && !numberAlrt){
            console.log(clickCount)
            if(clickCount >= 1){

                //chacked user allredy register
                try{
                    let UserFind_result = await fetch(`https://codershopbackend-838z.onrender.com/userFind/${email}`);
                    UserFind_result = await UserFind_result.json();
                    if(Object.keys(UserFind_result).length > 0){
                       setUserFind(true)
                    }else{
                       setUserFind(false);
                       //api call
                       try{
                        let postUser_result = await fetch('https://codershopbackend-838z.onrender.com/register' , {
                            method : "post",
                            body:JSON.stringify({name , email , password , number}),
                            headers : {
                                "Content-Type":"application/json",
                               "Accept":"application/json"
                            }
                        });
                        postUser_result =await postUser_result.json();
                        console.log(postUser_result);
                        localStorage.setItem('User' , JSON.stringify(postUser_result));
                        navigate('/')
                        // localStorage.setItem('Msg', "succesfully signUp")
                       }catch(error){
                        console.log(error);
                       }
                    }    
                }catch(error){
                   console.log(error);
                }

            
            //     //call api
            //    if(!userFind){
            //     console.log(userFind);
                
            //    }

                clickCount = 0;
            }
            clickCount++;
         }
      }
    }

    return (
          <>
        
        <div className="container" style={{background : mood === 'ligth' ? '#f2f2f2' : '#283747 '}}>
            <div className="wrapper" style={{margin:'0px' , background : mood === 'ligth' ? '#FFFF' : '#1C2833'}}>
                <div className="title"><span>SignUp Form</span></div>
                <form>
                {
                    userFind && <Alert  severity="error" style={{marginBottom:'5px'}}>email id alredy register</Alert>
                }
                <div className="row">
                    <i className="fas fa-user"></i>
                    <input type="text" value={name} id='name' placeholder="name " onChange={(e)=>{(setName(e.target.value))}} required/>
                </div>
                {
                    nameAlrt && <AlrtBox>* name length  must  be greter then 3</AlrtBox>
                }
                <div className="row">
                    <i className="fas fa-envelope"></i>
                    <input type="email" placeholder="Email " value={email} onChange={(e)=>{(setEmail(e.target.value))}} required/>
                </div>
                {
                    emailAlrt && <AlrtBox>* email is abc@gmail.com</AlrtBox>
                }
                <div className="row">
                    <i className="fas fa-key"></i>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>{(setPassword(e.target.value))}} required/>
                </div>
                {
                    passwordAlrt && <AlrtBox>* password  length greter than 8 to 15 </AlrtBox>
                }
                <div className="row">
                  <i className="fas fa-phone"></i>
                    <input type="Number" placeholder="Mobile number" value={number} onChange={(e)=>{(setNumber(e.target.value))}} required/>
                </div>
                 {
                    numberAlrt && <AlrtBox>* number length is 10 </AlrtBox>
                }
                 
                <div className="row button">
                    <input type="button" value="Sign up" onClick={handleSignUp}/>
                </div>
                <div className="signup-link" style={{ color : mood === 'ligth' ? 'black' : '#fff'}}>Alredy account ? <Link to={'/logIn'}>Login now</Link></div>
                </form>
            </div>
            </div>
        </>
    )
}

export default SignUp

