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
    <>
        <form onSubmit={(e) => handleSubmit(e)}>
            <h1 className="whiteSide">Sign In</h1>
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
            <button>Log In</button>
        </form>
    </>

  )
}

export default Login