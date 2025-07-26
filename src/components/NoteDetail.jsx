import { React, use, useState, useEffect } from "react";
import landingImg from "../assets/landing.png"; // adjust path as needed
import styles from "../css/Create.module.css";
import UserData from "./UserData";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import useToast from './Toast.jsx'
import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

function Contact() {
  
  let [loading, setLoading] = useState(true)
  let [noteDetail, setNoteDetail] = useState([])


  let {id} = useParams()


  const [required, setRequired] = useState(true);

  console.log('required is: ' + required)
  const useUserData = UserData();
  const [form, setForm] = useState({ title: "", description: "" });
  // const [title, setTitle] = useState("")
  // const [description, setDescription] = useState("")
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    // e.preventDefault()

    let btn = e.target;
    btn.disabled = true;
    const createdUser = useUserData._id;
    let title = form.title;
    let description = form.description;
    const response = await fetch(`http://localhost:2000/noteDetail/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({title, description}),
    });

    const data = await response.json();
    //    console.log(data)
    if (data.message == "success") {
    console.log('alldone')
      setNoteDetail(data.result)
  useToast("Saved Successfully", 'success', 'success')
      
    }
  };

  const handleClick = (e) => {
    setRequired(true)
    if (form.title == "" && form.description == "") {
    } else {
      handleSubmit(e);
    }
  };


   
  useEffect(()=> {
    fetch(`http://localhost:2000/noteDetail/${id}`)
    .then(res => res.json())
    .then(data => {setForm(data.note)
      setNoteDetail(data.note)
        
        setLoading(false)
    })
    .then(err => console.log(err))
  }, [])
  
  

   

  const checkRequired = async (e) => {

    const newdata = { ...form, [e.target.name]: e.target.value }
    setForm(newdata);
    
    
//    console.log('title: ' + form.title)
//    console.log('description: ' + form.description)
   
   
   if (newdata.title == "" && newdata.description == "") {
       setRequired(true);
    } 
    else if(newdata.title == noteDetail.title && newdata.description == noteDetail.description){
     setRequired(true)
    }
    else {
        setRequired(false);
    }
};

console.log('noteDe')
console.log(noteDetail)


  return (
    <>
   
      <div className="mt-4">
        <div className="row">
          <div className="col">
           
             
            <div className="d-flex justify-content-between align-items-center mb-3">
              
                <Link to="/dashboard">
               <h1 className="text-danger fw-bold">
              <IoArrowBack />             
              </h1>
                </Link>
              {/* <h1 className="text-danger fw-bold">Write Your NOTE</h1>{" "} */}
              
              {required ?  <button
                className="btn fw-bold text-light bg-danger ps-3 pe-3 pt-2 pb-2"
              disabled>
                Save
              </button> :  <button
                onClick={handleClick}
                className="btn fw-bold text-light bg-danger ps-3 pe-3 pt-2 pb-2"
              >
                Save
              </button>}
             
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div class="col">
                  {loading ?  <p class="placeholder-glow">
  <span style={{height: '41px'}} class="placeholder col-12"></span>
</p> :  <input
                    placeholder="Title"
                    onChange={checkRequired}
                    type="text"
                    value={form.title}
                    name="title"
                    className={`${styles.inp}`}
                    id=""
                    required
                  />}

                 
                  <div class="valid-feedback">Looks good!</div>
                </div>
              </div>
              <div className="row">
                <div className="col mb-3">
                  {loading ?  <p class="placeholder-glow">
  <span style={{height: '163px'}} class="placeholder col-12"></span>
</p> : <textarea
                    onChange={checkRequired}
                    value={form.description}
                    name="description"
                    placeholder="Write something here..."
                    type="text"
                    className={`${styles.txtbox}`}
                    id="exampleInputPassword1"
                    style={{ resize: "none", height: "800px" }}
                  ></textarea>}
                  
                </div>
              </div>

              {/* <button className='btn fw-bold text-light bg-danger rounded-pill ps-3 pe-3 pt-2 pb-2'>Create</button> */}
            </form>
          </div>
          {/* <div className="col">
            <img className='height: 35vh' src={landingImg} alt="" />
        </div> */}
        </div>
      </div>
            <ToastContainer />
      
    </>
  );
}

export default Contact;
