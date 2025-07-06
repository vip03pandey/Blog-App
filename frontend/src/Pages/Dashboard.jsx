import React from 'react'
import  FollowingPointerDemo  from './Article'

const Dashboard = () => {
  return (
    <div className='bg-white max-w-screen h-screen mt-0'>
        <h1 className='py-5 font-bold text-2xl md:text-4xl font-sans'>Your Articles</h1>
      {/* <FollowingPointerDemo filterByUser={User.id}/> */}
      <FollowingPointerDemo />
    </div>
  )
}

export default Dashboard
