import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import TopAiring from './topAiring/TopAiring'
const Home = () => {
  return (
    <div className='h-full py-10 bg-[#0c1b31]'>
        <HeroBanner />
        <TopAiring />
        
    </div>
  )
}

export default Home
