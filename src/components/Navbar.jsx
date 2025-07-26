import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserAlt } from "react-icons/fa";
import UserData from "./UserData";

function Navbar() {
  const useUserData = UserData();
  // const [userAcc, setUserAcc] = useState("")
  const [detail, setDetail] = useState(false);
  const { isLoggedIn, logout } = useAuth(); // <-- get login state & logout fn
  const navigate = useNavigate();

  //  user data code here
  console.log(useUserData);

  function handlelogout() {
    logout();
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-danger" data-bs-theme="dark">
        <div className="container-fluid">
          {isLoggedIn ? (
            <Link className="navbar-brand" to="/dashboard">
              INotes
            </Link>
          ) : (
            <Link className="navbar-brand" to="/">
              INotes
            </Link>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {isLoggedIn ? (
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
            {isLoggedIn ? (
              <>
                {" "}
                <button
                  onClick={() => handlelogout()}
                  className="btn btn-light text-danger fw-bold"
                >
                  Logout
                </button>{" "}
                {useUserData.profileImg ? 
<img onClick={() => {
                      setDetail(!detail);
                    }}  className="google_img" src={useUserData.profileImg} alt="" />
                :
<div>
                  <FaUserAlt
                    onClick={() => {
                      setDetail(!detail);
                    }}
                    className="profile_icon"
                  />
                </div>
              }
                


              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="btn btn-light text-danger fw-bold"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>

      <div
        className="profile_detail"
        style={{
          display: detail ? "flex" : "none",
        }}
      >
        <div className="profile_detail_p">
          <p style={{ textTransform: "capitalize" }}>{useUserData.name}</p>
          <p className="email_p">{useUserData.email}</p>
        </div>

        <hr />
        <div className="profile_option">
          <p>Profile</p>
          <p>Settings</p>
          <p>Logout</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
