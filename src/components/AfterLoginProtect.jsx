import {React, useEffect, useState} from 'react'
import landingImg from '../assets/landing.png'; // adjust path as needed
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

function AfterLoginProtect({children}) {
  

        const { isLoggedIn, logout } = useAuth();  // <-- get login state & logout fn
        const [checkingAuth, setCheckAuth] = useState(true);
        const navigate = useNavigate()
        useEffect(() => {
            if (isLoggedIn) {
                navigate('/dashboard');
            }
            else{
                setCheckAuth(false)
            }
        }, [isLoggedIn]);
        
        if (checkingAuth){
            return null;
        } 
        else{
            return children
        }
    }

    



export default AfterLoginProtect
