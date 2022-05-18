import React, { useState } from 'react'

const defaultFormState = { username: "", password: "" };

function Login() {

const [formData, setFormData] = useState(defaultFormState)

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
    })
}



  return (
    <div className="loginContainer">Login
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Username</label>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            ></input>

            <label>Password</label>
            <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
            ></input>
            <button>Submit</button>
        </form>
    </div>

  )
}

export default Login