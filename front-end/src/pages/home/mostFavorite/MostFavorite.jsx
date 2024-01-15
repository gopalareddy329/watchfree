import React, { useEffect } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import CardSlider from '../../../components/cardSlider/CardSlider'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'


const MostFavorite = () => {
    const {type} = useSelector((state)=>(state.home))
    const {data,loading,error}=useFetch(`/getdata/${type}/favorite/`)
    
    if(error){
      console.log("error")
      return(<div>error</div>)
    }
    
    
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