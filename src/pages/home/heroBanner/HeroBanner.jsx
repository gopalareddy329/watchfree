import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'


const HeroBanner = () => {
  const [backGround,setBackGround] = useState("")
  
  const {data,loading,error} = useFetch("/src/utils/db.json")
  useEffect(()=>{
    const url = {
      backdrop:"https://images8.alphacoders.com/122/1227604.jpg",
      poster:data?.movies[1].posterUrl,
      profile:data?.movies[2].posterUrl
    };
    const bg = url.backdrop
    setBackGround(bg)
  },[data])
  
  return (
    <div className='w-full h-[450px]  flex items-center justify-center relative md:h-screen'>
        {!loading && 
          
              <div className='w-full h-full absolute flex justify-center   top-0 left-0 opacity-[0.5]  overflow-hidden'> 
                  <span className='w-full h-full '>
                      <Img src={backGround} classname="w-[100%]  h-[100%] block  object-cover object-center"/>
                      
                  </span>
                  <div className='absolute gradient top-0 left-0 w-full  h-[450px] z-0 md:h-full' style={{"zIndex":0}}/>
              </div>
          
        }
        
        
        <div className='w-full  gradient absolute bottom-0 left-0' />
        <ContentWrapper>
            <div className='flex h-[90%] flex-col justify-end   items-center   text-white text-center relative  mx-auto my-0'>
                <span className='text-[50px] font-[700px]  md:mb-0 md:text-[90px] Salsa'><b>Genee</b></span>
                

                
              
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner