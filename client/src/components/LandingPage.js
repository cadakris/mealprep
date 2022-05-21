import React, { useRef } from 'react'

import Signup from './Signup'
import Login from './Login'

function LandingPage({setUser}) {

    const changeClassName = useRef()

    function addClass () {
        changeClassName.current.classList.add('right-panel-active')
}

    function removeClass () {
        changeClassName.current.classList.remove('right-panel-active')
    }

  return (
    <div className="fuckingwork">
        <div className="container-mainforms" ref={changeClassName}>
            <div className="form-container login-container">
                <Login setUser={setUser}/>
            </div>

            <div className="form-container signup-container">
                <Signup setUser={setUser}/>
            </div>

            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 className="h1title">Welcome Back!</h1>
                        <p className="welcomeMessage">To keep connected with us, please login with your personal info!</p>
                        <button onClick={removeClass} className="ghost" id="signIn"> SIGN IN! </button>
                    </div>

                    <div className="overlay-panel overlay-right">
                        <h1 className="h1title">Hello, Friend!</h1>
                        <p className="welcomeMessage">Please enter your personal details to get started!</p>
                        <button onClick={addClass} className="ghost" id="signUp"> CREATE AN ACCOUNT! </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage