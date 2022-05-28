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
        }
        navigate("/");
      });
    }

  return (
    <>
        <div className="navbarContainer">
          <div className="linkContainer">
          <ul>
            <li>
              <button className="btnstyle" onClick={() => navigate("/user-recipe-page")}>My Recipes</button>
            </li>
            <li>
              <button className="btnstyle" >My Profile</button>
            </li>
            <li>
              <button className="btnstyle"  onClick={handleLogoutClick}>Logout</button>
            </li>
          </ul>
          </div>
        </div>
    </>

  )
}

export default Navbar