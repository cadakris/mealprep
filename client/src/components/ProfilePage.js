import React from 'react'

function ProfilePage({user}) {

    const defaultProfileForm = {
        full_name: user.full_name,
        username: user.username,
        email_address:  "",
        bio: "",
        image:  "",
    }

  return (
    <>
        <div className="ProfileContainer">

        </div>
    
    </>
  )
}

export default ProfilePage