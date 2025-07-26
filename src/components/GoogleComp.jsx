import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; // ✅ fixed import


export default function GoogleComp() {
  
  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential); // ✅ fixed usage
          console.log('User Info:', decoded); // { name, email, picture, etc. }
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </div>
  );
}
