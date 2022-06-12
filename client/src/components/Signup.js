import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye} from "react-icons/fa"

const defaultFormState = {
    full_name:"",
    username:"",
    email_address:"",
    password:"",
    password_confirmation:"",
    image:"https://res.cloudinary.com/dnr8dgxt2/image/upload/v1654187881/images_rdccxl.png"
}

function Signup({setUser}) {

const [formData, setFormData] = useState (defaultFormState)
const [errors, setErrors] = useState(null);
const [showPassword, setShowPassword] = useState(false)

const navigate = useNavigate();

const passwordShownIcon = showPassword === true ? <FaEye size={16} /> : <FaEyeSlash size={16} />;

function togglePassword(e) {
    console.log("clicked")
    e.preventDefault();
    setShowPassword(!showPassword)
}

function handleChange (e) {
    setFormData ({
        ...formData,
        [e.target.name]: e.target.value,
    });
}

function handleSubmit (e){
    e.preventDefault()

    fetch('/signup', {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .then((userObj) => {
        console.log("User signup data:", userObj)

        if (userObj.username) {
            navigate("/user-recipe-page")
            setUser(userObj);
            setErrors(null);
          } else {
            if (userObj.errors) {
              setErrors(userObj.errors);
            } else {
              setErrors(null);
            }
            setUser(null);
          }
    })
    .catch((error) => console.log(error.message));
    //reset form
    setFormData(defaultFormState)
}

function handleSignUpButton (e) {
    console.log("what it do")
}

const errorsToDisplay = errors === null ? null : errors[0];

  return (
    <>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1 className="whiteSide">Create Account</h1>
                <label> Name: </label>
                    <input
                        className="loginsignupinput"
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                    ></input>
                <label> Username: </label>
                    <input
                        className="loginsignupinput"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    ></input>
                <label> Password: </label>
                    <input
                        className="loginsignupinput"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    ></input>
                <label> Confirm Password: </label>
                    <input
                        className="loginsignupinput"
                        type={showPassword ? 'text' : 'password'}
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                    ></input>     

            <button className="icon" onClick={(e) => togglePassword(e)}> {passwordShownIcon} </button>
      
            <button className="landingPageButton" onClick={handleSignUpButton}>Submit!</button>
            <span className="errorMessage">{errorsToDisplay}</span>
        </form>
    </>

  )
}

export default Signup