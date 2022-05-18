import React, { useState} from 'react'

function LandingPage() {
  return (
    <div>Welcome!
        <div className="buttonContainers">
            <button onClick={handleClick}>Login</button>
            <button onClick={handleClick}>Sign Up</button>
        </div>
    </div>
  )
}

export default LandingPage