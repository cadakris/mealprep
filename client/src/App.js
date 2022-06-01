import React, { useState, useEffect,  } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import ProfilePage from './components/ProfilePage'
import LandingPage from './components/LandingPage'
import UserRecipePage from './components/UserRecipePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  console.log(user)

  //LOGIN
  useEffect(() => {
    fetch(`/me`)
      .then((res) => res.json())
      .then((userObj) => {
        console.log("logged in", userObj);

        if (userObj.username) {
          setUser(userObj);
        }
      })
      .catch((error) => console.log(error.message));
  }, []);

  
//START OF RETURN
  return (
<>

<BrowserRouter>
    {user ? (
      <Navbar user={user} setUser={setUser}/>
    ) : (null)
    }
  <Routes>
    {user ? (
      <>
      <Route
      path="/user-recipe-page"
      element={<UserRecipePage setUser={setUser} user={user}/>}
      ></Route>

      <Route
      path="/profile"
      element={<ProfilePage setUser={setUser} user={user}/>}
      ></Route>
      </>
    ) : (
      <Route
        path="/"
        element={
        <LandingPage setUser={setUser}/>}
      ></Route>
    )}
  </Routes>
</BrowserRouter>
<Footer />
</>
  )
}

export default App;
