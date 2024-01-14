import React, { useEffect } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import CardSlider from '../../../components/cardSlider/CardSlider'
import useFetch from '../../../hooks/useFetch'


const MostPopular = () => {
    const {data,loading}=useFetch(`/getdata/popular/`)
    useEffect(()=>{
      
    },[])
    
    
  return (
    <div className=' relative    text-white'>
        <ContentWrapper>
            <span className='text-[24px]  font-normal'>MostPopular</span>
        </ContentWrapper>
        <CardSlider  data={data} loading={loading}/>

    </div>
  )
}

export default MostPopular