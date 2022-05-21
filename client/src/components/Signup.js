import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const defaultFormState = {
    full_name:"",
    username:"",
    email_address:"",
    password:"",
    password_confirmation:""
}

function Signup({setUser}) {

const [formData, setFormData] = useState (defaultFormState)
const [errors, setErrors] = useState(null);

const navigate = useNavigate();

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
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                    ></input>
                <label> Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    ></input>
                <label> Email Address: </label>
                    <input
                        type="text"
                        name="email_address"
                        value={formData.email_address}
                        onChange={handleChange}
                    ></input>
                <label> Password: </label>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    ></input>
                <label> Confirm Password: </label>
                    <input
                        type="text"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                    ></input>              
            <button onClick={handleSignUpButton}>Submit!</button>
            <span className="errorMessage">{errorsToDisplay}</span>
        </form>
    </>

  )
}

export default Signup