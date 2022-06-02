import React, { useEffect, useState } from 'react'

function ProfilePage({user, setUser}) {

    const defaultProfileForm = {
        full_name: user.full_name,
        username: user.username,
        email_address:  user.email_address,
        bio: user.bio,
        image:  "",
    }

    const [profileFormData, setProfileForm] = useState({defaultProfileForm})
    const [editModeOff, setEditModeOff] = useState(true);

    useEffect(() => {
        fetch(`/users/${user.id}`)
        .then((res) => res.json())
        .then((currentUserObj) => {
            console.log(currentUserObj)
            setUser(currentUserObj)
            setProfileForm(defaultProfileForm);
        })
    }, [setUser, user.id]);



    function handleClick(e) {
    //click to toggle form
    setEditModeOff(false);
    }

    function handleChange(e) {
        setProfileForm({...profileFormData, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()


    //UPDATE USER INFO

    fetch(`/users/${user.id}`, {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            name: profileFormData.name,
            username: profileFormData.username,
            email_address: profileFormData.email_address,
            bio: profileFormData.bio,
        }),
    })
        .then((res) => res.json())
        .then((updatedUserObj) => {
            setUser(updatedUserObj);
            setProfileForm(updatedUserObj)
        })

        //reset form to show user data
        setProfileForm({
            name: profileFormData.name,
            username: profileFormData.username,
            bio: profileFormData.about,
        })

        setEditModeOff(true)
    }

  return (
    <>
    <div className="profileContainerBackground">
    <img
        src="https://res.cloudinary.com/dnr8dgxt2/image/upload/v1654187881/images_rdccxl.png"
        alt="cartoon cat"
        className="userProfilePic"
      ></img>
    {editModeOff ? (
            <div className="innerProfileInfo">
                    <div className="profileLabel">Name</div>
                    <div className="rightSpanDiv">
                    <span className="profileSpan">{user.name}</span>
                    </div>

                    <div className="profileLabel">Username</div>
                    <div className="rightSpanDiv">
                    <span className="profileSpan">{user.username}</span>
                    </div>

                    <span className="profileLabel">Email Address</span>
                    <div className="rightSpanDiv">
                    <span className="profileSpan">{user.email_address}</span>
                    </div>

                    <span className="profileLabel">Bio</span>
                    <div className="rightSpanDiv">
                    <span className="profileSpan">{user.bio}</span>
                    </div>

                    <button onClick={(e) => handleClick(e)}className="profileButton">Edit Profile</button>
            </div>
        ) : (
            <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <label className="userProfileLabel"> Name: </label>
                <input
                    name="name"
                    value={defaultProfileForm.name}
                    onChange={(e) => handleChange(e)}
                    className="userProfileInputBox"
                ></input>

                <label className="userProfileLabel"> Username: </label>
                <input
                    name="username"
                    value={defaultProfileForm.username}
                    onChange={(e) => handleChange(e)}
                    className="userProfileInputBox"
                ></input>

                <label className="userProfileLabel"> Email Address: </label>
                <input
                    name="email_address"
                    value={defaultProfileForm.email_address}
                    onChange={(e) => handleChange(e)}
                    className="userProfileInputBox"
                ></input>

                <label className="userProfileLabel"> Bio: </label>
                <textarea
                    name="bio"
                    value={defaultProfileForm.bio}
                    onChange={(e) => handleChange(e)}
                    className="userProfileInputBox"
                    rows={10}
                ></textarea>
                <button className="profileButton">Submit</button>
            </form>
            </div>
            )}
    </div>
    </>
  )
        }
export default ProfilePage
