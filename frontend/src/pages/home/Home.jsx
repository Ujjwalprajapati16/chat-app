import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageConatiner from '../../components/messages/MessageConatiner'

const Home = () => {
  return <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
    <Sidebar />
    <MessageConatiner />
  </div>
}

export default Home