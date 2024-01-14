import React, { useEffect } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import CardSlider from '../../../components/cardSlider/CardSlider'
import useFetch from '../../../hooks/useFetch'


const MostFavorite = () => {
    const {data,loading}=useFetch(`/getdata/favorite/`)
    useEffect(()=>{
      
    },[])
    
    
  return (
    <div className=' relative  text-white'>
        <ContentWrapper>
            <span className='text-[24px]  font-normal'>Mostfavorite</span>
        </ContentWrapper>
        
        <CardSlider  data={data} loading={loading}/>

    </div>
  )
}

export default MostFavorite