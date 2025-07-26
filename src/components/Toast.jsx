import React from 'react'
import { ToastContainer, toast } from 'react-toastify';

function Toast(mess, type, bg) {
    if(type == 'success'){
     var tost = toast.success
    }
    else if(type == 'error'){
     var tost = toast.error
    }
    else if(type == 'warning'){
     var tost = toast.warning
    }
    else{
        var tost = toast.info
    }
        tost(mess, {
          position: "bottom-left", // 👈 Alert with bottom line effect
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          className: `border border-${bg}-subtle`
        });
      

  return
}

export default Toast
