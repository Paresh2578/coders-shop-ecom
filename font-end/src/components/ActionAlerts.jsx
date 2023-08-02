import React , {useState} from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';

const ArtlStyle = styled(Alert)(({theme})=>({
  position:'fixed',
  right:'10px',
   bottom:'5vh',
  "@media (max-width : 800px ) " : {
    bottom:'10vh'
  }

}))

const  ActionAlerts = ({msg})=> {
   const [alrtClose , setALrtClose] = useState(true);

   const handleOnCLose = ()=>{
     setALrtClose(false);
     localStorage.clear('Msg');
   }
  return (
    <>
    {
      alrtClose ?   <ArtlStyle onClose={handleOnCLose}>{msg}</ArtlStyle>
        : ""
      
    } 

    </>
  );
}
export default ActionAlerts;