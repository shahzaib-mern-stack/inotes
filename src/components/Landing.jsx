import {React, useEffect, useState} from 'react'
import landingImg from '../assets/landing.png'; // adjust path as needed
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'

function Landing() {
  const { isLoggedIn, logout } = useAuth();  // <-- get login state & logout fn
  const [checkingAuth, setCheckAuth] = useState(true);
  const navigate = useNavigate()
   
  return (
    
    <>
    
    <div className="container-fluid ps-5 pe-5">
    {/* LoggedIn status {isLoggedIn} */}
    <div className="row main_row">
        <div className="col">
       <h1 className='text-danger fw-bold'>World's Best Note App</h1>
       <p className='mb-4 mt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure reprehenderit tempore obcaecati, cumque laudantium magni libero quam harum dicta odio quisquam sunt! Voluptates quaerat officia ut optio possimus expedita qui! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt excepturi itaque, est quia impedit tempora explicabo modi molestiae cumqu</p>
       <button onClick={() => navigate('/about')} className='btn fw-bold text-light bg-danger rounded-pill ps-3 pe-3 pt-2 pb-2'>More Info</button>
        </div>
        <div className="col">
            <img className='height: 35vh' src={landingImg} alt="" />
        </div>
    </div>
    </div>
    </>
  )
}

export default Landing
