import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'
import {NavbarDemo} from '../common/Navbar'

const UserLayout = () => {
  return (
    <div>
      <NavbarDemo/>
      <main className='w-full overflow-x-hidden' >
        <Outlet></Outlet>
      </main>
      {/* <Footer/> */}
    </div>
  )
}

export default UserLayout
