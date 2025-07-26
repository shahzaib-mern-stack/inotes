import React from 'react'
import landingImg from '../assets/landing.png'; // adjust path as needed

function About() {
  return (
    <>
    <div className="container-fluid ps-5 pe-5">

    <div className="row main_row">
        <div className="col">
            <img className='height: 35vh' src={landingImg} alt="" />
        </div>
        <div className="col">
       <h1 className='text-danger fw-bold'>About Us</h1>
       <p className='mb-4 mt-4'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure reprehenderit tempore obcaecati, cumque laudantium magni libero quam harum dicta odio quisquam sunt! Voluptates quaerat officia ut optio possimus expedita qui! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error, facilis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt excepturi itaque, est quia impedit tempora explicabo modi molestiae cumqu Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta dolores, dignissimos odio quo saepe distinctio accusamus, tempora rerum recusandae temporibus earum libero esse omnis incidunt sed dolore illum. Vel, expedita! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores, distinctio impedit! Expedita exercitationem aliquid enim velit ut explicabo, provident, eum cum amet fugit temporibus quae necessitatibus soluta aspernatur. Quo, aliquid. Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero eum delectus perspiciatis et culpa non ut nulla ducimus ad ex error modi, velit distinctio enim. Delectus quasi laudantium impedit iure.</p>
        </div>
        
    </div>
    </div>
    </>
  )
}

export default About;
