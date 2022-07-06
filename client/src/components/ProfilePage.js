import React, { useEffect, useState } from 'react'
import Axios from "axios"

function ProfilePage({user, setUser}) {

    const defaultProfileForm = {
        full_name: user.full_name,
        username: user.username,
        email_address:  user.email_address,
        bio: user.bio,
        image:  user.image,
    }

    const [profileForm, setProfileForm] = useState({defaultProfileForm})
    const [editModeOff, setEditModeOff] = useState(true);
    const [userImageSelected, setUserImageSelected] = useState("")

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
        setProfileForm({...profileForm, [e.target.name]: e.target.value})
    }

     //UPDATE USER INFO
    function handleSubmit(e) {
    e.preventDefault()
    fetch(`/users/${user.id}`, {
        method:"PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            name: profileForm.name,
            username: profileForm.username,
            email_address: profileForm.email_address,
            bio: profileForm.bio,
            image: userImageSelected
        }),
    })
        .then((res) => res.json())
        .then((updatedUserObj) => {
            setUser(updatedUserObj);
            setProfileForm(updatedUserObj)
        })

        //reset form to show user data
        setProfileForm({
            name: profileForm.full_name,
            username: profileForm.username,
            email_address: profileForm.email_address,
            bio: profileForm.bio
        })
        setEditModeOff(true)
    }

    //UPLOAD PHOTO FROM CLOUDINARY VIA AXIOS POST REQUEST
    const uploadImage = (files) => {
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "mafnci9q")

        Axios.post("https://api.cloudinary.com/v1_1/dnr8dgxt2/image/upload", formData)
        .then((userImageData) => {
            //this state captures the URL from cloudinary
            setUserImageSelected(userImageData.data.url)
        })
    }
    console.log(userImageSelected)

  return (
    <>
    <div className="profileBackground">
    <img
        src={user.image}
        alt={user.full_name}
        className="userProfilePic"
      ></img>

    {editModeOff ? (
        <>
            <div className="innerProfileInfo">
                <table>
                <tr>
                    <td className="addPadding">Name:</td>
                    <td>{user.full_name}</td>
                </tr>
                <tr>
                    <td className="addPadding">Username:</td>
                    <td>{user.username}</td>
                </tr>

                <tr>
                    <td className="addPadding">Email:</td>
                    <td>{user.email_address}</td>
                </tr>

                <tr>
                    <td className="addPadding">Bio:</td>
                    <td>{user.bio}</td>
                </tr>
                <tr>

                </tr>
                </table>

            </div>
            <button onClick={(e) => handleClick(e)}className="profileButton">Edit Profile</button>
            </>
        ) : (
            <div className="formContainer">
             <input
                type="file"
                // value={profileForm.image}
                // name="image"
                onChange={(e) => {uploadImage(e.target.files)}}
            >
            </input>
            <form onSubmit={handleSubmit}>
                <label className="userProfileLabel"> Name: </label>
                <input
                    name="full_name"
                    value={profileForm.full_name}
                    onChange={(e) => handleChange(e)}
                    className="userProfileInputBox"
                ></input>

                <label className="userProfileLabel"> Username: </label>
                <input
                    name="username"
                    value={profileForm.username}
                    onChange={(e) => handleChange(e)}
                    className="userProfileInputBox"
                ></input>

                <label className="userProfileLabel"> Email Address: </label>
                <input
                    name="email_address"
                    value={profileForm.email_address}
                    onChange={(e) => handleChange(e)}
                    className="userProfileInputBox"
                ></input>

                <label className="userProfileLabel"> Bio: </label>
                <textarea
                    name="bio"
                    value={profileForm.bio}
                    onChange={(e) => handleChange(e)}
                    className="userProfileInputBox"
                    rows={30}
                ></textarea>
                <div className="buttonContainer"><button className="profileButton">Submit</button></div>
            </form>
            </div>
            )}
    </div>
    </>
  )
        }
export default ProfilePage
