import React from 'react'
import landingImg from '../assets/landing.png'; // adjust path as needed
import styles from '../css/Contact.module.css'

function Contact() {
  return (
    <>
    <div className="container-fluid ps-5 pe-5">

    <div className="row main_row">
        <div className="col">
       <h1 className='text-danger fw-bold'>Get In Touch</h1>
       <form>
        <div className="row">

         <div class="col-md-5">
    <label for="validationCustom01" class="form-label">Name</label>
    <input type="text" className={`form-control ${styles.inp}`} id="" required />
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
  <div class="col-md-5">
    <label for="validationCustom02" class="form-label">Email</label>
    <input type="email" className={`form-control ${styles.inp}`} id="" required />
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
        </div>
        <div className="row mt-3">

  <div className="col-10 mb-3">
    <label for="exampleInputPassword1" className="form-label">Message</label>
    <textarea type="text" className={`form-control ${styles.inp}`} id="exampleInputPassword1" style={{resize: 'none', height: '180px'}}></textarea>
  </div>
        </div>

 
  <button className='btn fw-bold text-light bg-danger rounded-pill ps-3 pe-3 pt-2 pb-2'>Submit</button>
</form>
        </div>
        <div className="col">
            <img className='height: 35vh' src={landingImg} alt="" />
        </div>
    </div>
    </div>
    </>
  )
}

export default Contact;
