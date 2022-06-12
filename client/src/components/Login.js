import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye} from "react-icons/fa"

const defaultFormState = { username: "", password: "" };

function Login({setUser}) {

const [formData, setFormData] = useState(defaultFormState);
const [error, setError] = useState(null);
const [showPassword, setShowPassword] = useState(false)

const navigate = useNavigate();

const passwordShownIcon = showPassword === true ? <FaEye size={16} /> : <FaEyeSlash size={16} />;

function togglePassword(e) {
  console.log("clicked")
  e.preventDefault();
  setShowPassword(!showPassword)
}

function handleChange (e) {
    setFormData({
        ...formData, 
        [e.target.name]: e.target.value,
    });
}

function handleSubmit (e) {
    e.preventDefault()

    fetch(`/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      })
        .then((res) => res.json())
        .then((userObj) => {
          console.log("Logged in user: ", userObj);
          if (userObj.username) {
            navigate("/user-recipe-page")
            setUser(userObj);
            setError(null);

          } else {
            if (userObj.error) {
              setError(userObj.error);
            } else {
              setError(null);
            }
            setUser(null);
          }
        })
        .catch((error) => console.log(error.message));
}

const errorsToDisplay = error === null ? null : error;

  return (
    <>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1 className="whiteSide">Sign In</h1>
            <label>Username</label>
            <input
                className="loginsignupinput"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            ></input>

            <label>Password</label>
            <input
              className="loginsignupinput"
                type={showPassword ? 'text' : 'password'}
                // type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
            ></input>
            <button className="icon" onClick={(e) => togglePassword(e)}> {passwordShownIcon} </button>
            <button className="landingPageButton">Log In</button>
            <span className="errorMessage">{errorsToDisplay}</span>
        </form>
    </>

  )
}

export default Login