import React from 'react'
import landingImg from '../assets/landing.png'; // adjust path as needed
import styles from '../css/Contact.module.css'
import { Link } from 'react-router-dom';

function Regester() {
  return (
    <>
    <div className="container-fluid ps-5 pe-5">

    <div className="row main_row">
        <div className="col">
       <h1 className='text-danger fw-bold'>Create an account</h1>
       <form>
        <div className="row">

         <div class="col-8">
    <label for="validationCustom01" class="form-label">First Name</label>
    <input type="text" className={`form-control ${styles.inp}`} id="" required />
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
        </div>
        <div className="row">

         <div class="col-8">
    <label for="validationCustom01" class="form-label">Email</label>
    <input type="text" className={`form-control ${styles.inp}`} id="" required />
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
        </div>
        <div className="row mt-3">

   <div class="col-8">
    <label for="validationCustom01" class="form-label">Password</label>
    <input type="text" className={`form-control ${styles.inp}`} id="" required />
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
        </div>

 
  <button className='mt-3 btn fw-bold text-light bg-danger rounded-pill ps-3 pe-3 pt-2 pb-2'>Regester</button>
</form>

<p className='mt-3'>Already have acccount <Link className='text-danger' to="/login">Login</Link></p>
        </div>
        <div className="col">
            <img className='height: 35vh' src={landingImg} alt="" />
        </div>
    </div>
    </div>
    </>
  )
}

export default Regester;
