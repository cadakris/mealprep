import React from 'react'
import { useNavigate, } from "react-router-dom";

function Navbar({setUser}) {

  const navigate = useNavigate();

    // LOGOUT BUTTON
    function handleLogoutClick() {
      //   log out user by deleting session
      fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          setUser(null);
          console.log(r);
          console.log("loggedout")
        }
        navigate("/");
      });
    }

  return (
    <>
        <div className="navbarContainer">
          <div className="linkContainer">
          <button onClick={handleLogoutClick} className="btn">
            Logout
          </button>
          </div>
        </div>
    </>

  )
}

export default Navbar