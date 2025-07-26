import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import useToast from './Toast.jsx'

function App() {
    useToast("hello", 'error', 'danger')
   function showToast(){
    }
   
  

  return (
    <>
      <button onClick={showToast}>Show Alert</button>
      <ToastContainer />
    </>
  );
}

export default App;
