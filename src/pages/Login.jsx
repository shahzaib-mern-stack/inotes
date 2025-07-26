import {React, useState} from 'react'
import landingImg from '../assets/landing.png'; // adjust path as needed
import styles from '../css/Contact.module.css'
import { Link, useNavigate } from 'react-router-dom';
import AfterLoginProtect from '../components/AfterLoginProtect';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; // ✅ fixed import

import {useAuth} from '../context/AuthContext'
function Login() {

  const navigate = useNavigate()

  const { isLoggedIn, logout, login } = useAuth();


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState(false)
  const [errVal, setErrVal] = useState("")

 
  const handleLogin = async (e) => {
    e.preventDefault()
    let response = await fetch('http://localhost:2000/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })

    const Data = await response.json();

    if(response.ok){
      if(Data.message == "login200"){
        localStorage.setItem('token', Data.token)
        localStorage.setItem('userId', Data.userId)
        localStorage.setItem('notes', 0)
        navigate('/dashboard')
        login()

        

      }
      
      else{
        setErr(true)
        setErrVal(Data.message)
        console.log(Data.message)
      }
    }



  }


 async function handleGoogle(data){
   let name = data.name;
   let email = data.email
   let profileImg = data.picture

     let response = await fetch('http://localhost:2000/google/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, profileImg})
    })

    const Data = await response.json();
   
    if(Data.message == 'success'){
        localStorage.setItem('token', Data.token)
        localStorage.setItem('userId', Data.userId)
        navigate('/dashboard')
        login()
    }

  }


  return (
    <>
    <AfterLoginProtect></AfterLoginProtect>
    <div className="container-fluid ps-5 pe-5">

    <div className="row main_row">
        <div className="col">
       <h1 className='text-danger fw-bold'>Login</h1>
       <div className="row">
        <div className="col-8">

      
         <GoogleLogin
               onSuccess={(credentialResponse) => {
                 const decoded = jwtDecode(credentialResponse.credential); // ✅ fixed usage
                 console.log('User Info:', decoded);
                 handleGoogle(decoded)
                 // { name, email, picture, etc. }
               }}
               onError={() => {
                 console.log('Login Failed');
               }}
             />

               </div>
       </div>
             
       <form onSubmit={handleLogin}>
        <div className="row">

         <div class="col-8">
       <div className='custom_err' style={{background: 'red',
  height: '33px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 9px',
  color: 'white',
  visibility: err? 'visible' : 'hidden',
  borderRadius: '6px'}}><strong style={{marginRight: '5px'}}>Failed! </strong> {errVal}</div>
    <label for="validationCustom01" class="form-label">Email</label>
    <input type="text" onChange={(e)=> setEmail(e.target.value)} className={`form-control ${styles.inp}`} id="" required />
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
        </div>
        <div className="row mt-3">

   <div class="col-8">
    <label for="validationCustom01" class="form-label">Password</label>
    <input type="text" onChange={(e)=> setPassword(e.target.value)} className={`form-control ${styles.inp}`} id="" required />
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
        </div>

 
  <button type='submit' className='mt-4 btn fw-bold text-light bg-danger rounded-pill ps-3 pe-3 pt-2 pb-2'>Login</button>
</form>

<p className='mt-5'>New to plateform <Link className="text-danger" to="/regester">Create new account</Link></p>
        </div>
        <div className="col">
            <img className='height: 35vh' src={landingImg} alt="" />
        </div>
    </div>
    </div>
    </>
  )
}

export default Login;
