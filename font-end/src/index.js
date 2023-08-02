import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CartProvider} from './redux/context/cart_context'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

     <React.StrictMode >
       <CartProvider>
            <App/>
       </CartProvider>
     </React.StrictMode>

);

// If you wduxant to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://codershopbackend-838z.onrender.com://bit.ly/CRA-vitals
reportWebVitals();
