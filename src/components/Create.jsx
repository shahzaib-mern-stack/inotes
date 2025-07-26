import {React, useState} from 'react'
import landingImg from '../assets/landing.png'; // adjust path as needed
import styles from '../css/Contact.module.css'
import UserData from '../components/UserData'


function Contact() {
const useUserData = UserData()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

const handleSubmit =  async (e) => {
    e.preventDefault()
    const createdUser = useUserData._id;
    const token = localStorage.getItem('token')
   const response = await fetch('http://localhost:2000/add', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({title, description, createdUser})
   })

   const data =await response.json()
//    console.log(data)
   if(data.message == 'added'){
    setTitle("")
    setDescription("")
   }
}

  return (
    <>
    <div className="container-fluid ps-5 pe-5">

    <div className="row main_row">
        <div className="col">
       <h1 className='text-danger fw-bold'>Write Your NOTE</h1>
       <form onSubmit={handleSubmit}>
        <div className="row">

         <div class="col-md-10">
    <label for="validationCustom01" class="form-label">Title</label>
    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name='title' className={`form-control ${styles.inp}`} id="" required />
    <div class="valid-feedback">
      Looks good!
    </div>
  </div>
        </div>
        <div className="row mt-3">

  <div className="col-10 mb-3">
    <label for="exampleInputPassword1" className="form-label">Description</label>
    <textarea onChange={(e) => setDescription(e.target.value)} value={description} name='desc' type="text" className={`form-control ${styles.inp}`} id="exampleInputPassword1" style={{resize: 'none', height: '180px'}}></textarea>
  </div>
        </div>

 
  <button className='btn fw-bold text-light bg-danger rounded-pill ps-3 pe-3 pt-2 pb-2'>Create</button>
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
