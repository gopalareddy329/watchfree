import React, { useEffect } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import CardSlider from '../../../components/cardSlider/CardSlider'
import useFetch from '../../../hooks/useFetch'
import {useSelector} from 'react-redux'

const MostPopular = () => {
    const {type} = useSelector((state)=>(state.home))
    const {data,loading}=useFetch(`/${type === "movies" ? "getmovies":"getseries"}/popular`)
    useEffect(()=>{
      
    },[])
    
    
  return (
    <div className=' relative    text-white'>
        <ContentWrapper classname="mx-auto">
            <span className='text-[24px]  font-normal'>MostPopular</span>
        </ContentWrapper>
        <CardSlider  data={data} loading={loading}/>

    </div>
  )
}

export default MostPopular