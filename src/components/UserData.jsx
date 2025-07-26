import React, { useState, useEffect } from 'react'


function UserData() {
     let userId = localStorage.getItem("userId")
       const [userAcc, setUserAcc] = useState("")
     
  useEffect(() => {
  // if(isLoggedIn){
        fetch(`http://localhost:2000/user/${userId}`)
        .then(res => res.json())
        .then(data => setUserAcc(data))
        .then(err => console.log(err))
        
        // console.log('hello')
      // }
    }, [userId])
  return userAcc;
}

export default UserData
