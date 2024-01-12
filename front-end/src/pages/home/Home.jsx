import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import TopAiring from './topAiring/TopAiring'
import MostPopular from './mostPopular/MostPopular'
import MostFavorite from './mostFavorite/MostFavorite'
import ContentChange from '../../components/contentChange/ContentChange'
const Home = () => {
  return (
    <div className='min-h-fit mb-10 pb-10 bg-[#0c1b31]'>
        <HeroBanner />
        <ContentChange />
        <TopAiring />
        <MostPopular />
        <MostFavorite />
        <div className='h-[70px]'/>
        
    </div>
  )
}

export default Home
