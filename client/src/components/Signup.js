import React, { useState } from 'react'

const defaultFormState = {
    full_name:"",
    username:"",
    email_address:"",
    password:"",
    password_confirmation:""
}

function Signup() {

const [formData, setFormData] = useState (defaultFormState)


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
        console.log("User signup data:", userObj )
    })
}

  return (
    <div className="signUpContainer">
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="signUpInfo">
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
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>

  )
}

export default Signup