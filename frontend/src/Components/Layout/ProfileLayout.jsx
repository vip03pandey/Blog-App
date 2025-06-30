import React from 'react'
import { Profile } from '../../Pages/ProfileSideBar'
import { Outlet } from 'react-router-dom'
const ProfileLayout = () => {
  return (
    <div>
      <Profile/>
      <main className='w-full overflow-x-hidden' >
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default ProfileLayout
