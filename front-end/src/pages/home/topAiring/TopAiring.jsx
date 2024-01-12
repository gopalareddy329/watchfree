import React, { useEffect } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import CardSlider from '../../../components/cardSlider/CardSlider'
import useFetch from '../../../hooks/useFetch'
import {useSelector} from 'react-redux'

const TopAiring = () => {
    const {type} = useSelector((state)=>(state.home))
    const {data,loading}=useFetch(`/${type === "movies" ? "getmovies":"getseries"}/TopAiring`)
    useEffect(()=>{
      
    },[])
    
    
  return (
    <div className=' relative    text-white'>
        <ContentWrapper classname="mx-auto">
            <span className='text-[24px]  mx-auto w-full font-normal'>Top Airing</span>
        </ContentWrapper>
        <CardSlider  data={data} loading={loading}/>

    </div>
  )
}

export default TopAiring