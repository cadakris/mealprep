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

          <ul>
            <li><h1 className="logo" className="logo">ReciPrep</h1></li>

            <div className="linkContainer">
            <li>
              <button className="btnstyle" onClick={() => navigate("/user-recipe-page")}><ImSpoonKnife size={20}/></button>
            </li>
            <li>
              <button className="btnstyle" onClick={() => navigate("/profile")}><CgProfile size={20}/></button>
            </li>
            <li>
              <button className="btnstyle"onClick={handleLogoutClick}><FiLogOut size={20}/></button>
            </li>
            </div>


          </ul>

        </div>
    </>

  )
}

export default Navbar