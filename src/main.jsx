import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import store from "./store/store.js";

import './index.css'
import App from './App.jsx'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
 
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose={3000} />

         <App />
    </Provider>

  
)
