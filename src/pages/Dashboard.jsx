import { React, useEffect, useState } from "react";
import { useNavigate, Link, data } from "react-router-dom";
import UserData from "../components/UserData";
import { MdGridView, MdOutlineViewList  } from "react-icons/md";
import { TfiViewListAlt, TfiViewGrid } from "react-icons/tfi";
import { FaRegTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import useToast from '../components/Toast'
function Dashboard() {
  const token = localStorage.getItem('token')
  if(localStorage.getItem('notes')){
    var [noteNo, setNoteNo] = useState(localStorage.getItem('notes'))
  }
  else{
    var [noteNo, setNoteNo] = useState(5)
  }

    let [loading, setLoading] = useState(true)
  
  let view = localStorage.getItem("currentview");
  if (!view) {
    localStorage.setItem("currentview", "left");
  }
  const [currentView, setCurrentView] = useState(
    localStorage.getItem("currentview")
  );
  const [notes, setNotes] = useState("");
  const userId2 = localStorage.getItem("userId");
  const useUserData = UserData();

  useEffect(()=>{
    if(useUserData){
        
          
          setLoading(false)
     
      }
    else{
      setLoading(true)
    }
  }, [useUserData])

  const navigate = useNavigate();

  function changeView(e) {
    const currentElemId = e.currentTarget.id;
    const currentElem = document.querySelector('.active_view');
    console.log(currentElemId);
    if(currentElemId == 'right'){
    currentElem.classList.add('right')
    localStorage.setItem("currentview", "right");
    setCurrentView('right')
  }
  else{
      currentElem.classList.remove('right')
    localStorage.setItem("currentview", "left");
    setCurrentView('left')  
    }
  };
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const response = await fetch("http://localhost:2000/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        const mess = data.message;
        if (mess == "exist" || mess == "token" || mess == "invalid") {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // if(isLoggedIn){
    fetch(`http://localhost:2000/notes/${userId2}`)
      .then((res) => res.json())
      .then((data) => {setNotes(data.result)
        localStorage.setItem('notes', data.result.length)
        setNoteNo(data.result.length)
      })
      .then((err) => console.log(err));

    // }
  }, [userId2]);

  


 async function createNote(e) {
   var createdUser = localStorage.getItem('userId')
   var token = localStorage.getItem('token')

   let currentElem = e.currentTarget

    currentElem.disabled = true;
    currentElem.innerText = 'Creating';
   var response = await fetch('http://localhost:2000/add', {
    method: 'POST',
    headers: {'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({createdUser})
   })

   const data =await response.json()
//    console.log(data)
   if(data.message == 'added'){
    let result = data.result;
    let noteId = result[0]._id;

    navigate(`/note/${noteId}`)
   }
  }

 async function delFunc(e){
  let noteId = e.currentTarget.id;
 
  
    e.stopPropagation(); // 👈 Stop bubbling to parent div
    if(confirm('Are you sure to delete?')){
      let response = await fetch(`http://localhost:2000/noteDetail/${noteId}`,{
        method: 'DELETE'
      })

      let result = await response.json()
      setNotes(prev => prev.filter(ad => ad._id !== noteId));
      // if(result.message)
      console.log(result.message)
        useToast("Deleted Successfully", 'success', 'success')
       
        setNoteNo(noteNo-1)
      
    }
  }

  return (
    <>
    <div className="mt-4">


   <p style={{ fontSize: "34px", fontWeight: "bold" }}>
  Welcome{" "}
  {loading ? (
    <span className="placeholder-glow">
      <span className="placeholder col-lg-2 col-sm-6 col-6"></span>
    </span>
  ) : (
    <span style={{ textTransform: "capitalize", color: "#dc3545" }}>
      {useUserData.name}
    </span>
  )}
</p>

      {message}
   
 
    
    
      {/* {notes.length === 0 ? ( */}
      {loading ? (
      <div>

 <span className="placeholder-glow d-flex justify-content-between">
      <span style={{height: '34px'}} className="placeholder col-lg-2 col-sm-6 col-6"></span>
      <span style={{height: '34px'}} className="placeholder col-lg-2 col-sm-6 col-6"></span>
    </span>


   {currentView == 'left' ? <span className="placeholder-glow notes_placeholder_box">

      {Array.from({length: noteNo}).map((_,index)=>{
  return  <span className="placeholder col-12"></span>
})}
    </span> :  <span className="placeholder-glow notes_placeholder_list">
        {Array.from({length: noteNo}).map((_,index)=>{
  return <span className="placeholder col-12"></span>
})}
    </span>}


   </div>
      ) : (
       notes.length === 0 ? 

        <p>
          There is nothing any listing to show{" "}
          <button onClick={createNote} style={{ color: "#dc3545", background: 'none', border: 'none' }}>
            Create Now
          </button>
        </p>

        :
        <div>

            <div className="dashboard_row">

          <p className="main_p">Your Notes ({noteNo})</p>
          <span style={{display: 'flex',
  gap: '8px'}}>

          <button
            className="btn btn-danger"
            onClick={createNote}
          >
            Create Now
          </button>{" "}
          <div className="viewbox view_now">
            <span  className={`active_view ${currentView == 'right' ? 'right' : ""}`}></span>
            <span style={{
              color: currentView == 'left' ? 'white' : 'black',
              width: '33px',
              height: 'inherit'
              
            }} onClick={changeView} id="left">
              <TfiViewGrid />
            </span>
            <span style={{
              color: currentView == 'right' ? 'white' : 'black',
              width: '33px',
              height: 'inherit'
            }} onClick={changeView} id="right">
              <TfiViewListAlt />
            </span>
          </div>
              </span>
              </div>


          
          
    <div className={`note_container ${currentView === 'right' ? '' : 'change'}`}>
  
 
  {
  [...notes]
  .reverse()
  .map((item) => (

       
    
    
    <div onClick={()=> navigate(`/note/${item._id}`)} className="notes" key={item._id}>
      <span>

      <strong>{item.title.length == 0 ? "Untitled" : item.title}</strong>
      <p style={{ fontSize: '14px', lineHeight: '1.4', margin: '0px' }}>
        {item.description.length > 80
          ? item.description.substring(0, 80) + '...'
          : item.description}
      </p>
          </span>
          <span  >
      <FaRegTrashAlt id={item._id} onClick={delFunc} className="text-danger fw-bold delBtn"/>
          </span>
    </div>

  ))}
</div>



        </div>
        
      )}
          </div>


                      <ToastContainer />
          
    </>
  );
}

export default Dashboard;
