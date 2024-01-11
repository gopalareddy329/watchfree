import React from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import CardSlider from '../../../components/cardSlider/CardSlider'
import useFetch from '../../../hooks/useFetch'
const TopAiring = () => {
    const {data,loading}=useFetch("/src/utils/db.json")
    console.log((data))
  return (
    <div className='mt-[50px] relative  h-[500px]   text-white'>
        <ContentWrapper className="flex justify-between items-center mb-[30px] max-w-[1200px]">
            <span className='text-[24px]  font-normal'>Top Airing</span>
        </ContentWrapper>
        <CardSlider  data={data?.movies} loading={loading}/>

    </div>
  )
}

export default TopAiring