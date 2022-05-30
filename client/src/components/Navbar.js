import React from 'react'
import { useNavigate, } from "react-router-dom";
import { ImSpoonKnife } from "react-icons/im"
import { CgProfile } from "react-icons/cg"
import { FiLogOut } from "react-icons/fi"

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
              <button className="btnstyle" onClick={() => navigate("/user-recipe-page")}><ImSpoonKnife/></button>
            </li>
            <li>
              <button className="btnstyle"><CgProfile/></button>
            </li>
            <li>
              <button className="btnstyle"onClick={handleLogoutClick}><FiLogOut/></button>
            </li>
          </ul>
          </div>
        </div>
    </>

  )
}

export default Navbar