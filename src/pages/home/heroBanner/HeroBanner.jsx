import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'


const HeroBanner = () => {
  const [backGround,setBackGround] = useState("")
  const [query,setQuery] = useState("");
  const navigate = useNavigate();
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
  const serachQueryHandler = (e) => {
    if(e.key ==  'Enter' && query.length > 0){
      navigate(`/search/${query}`);
    }
  };
  return (
    <div className='w-full h-[450px] bg-[#04152d] flex items-center relative md:h-[700px]'>
        {!loading && 
          
              <div className='w-full h-full absolute top-0 left-0 opacity-[0.5]  overflow-hidden'> 
                  <span className='w-full h-full '>
                      <Img src={backGround} classname="w-[100%] h-[100%] object-cover object-center"/>
                  </span>
                  
              </div>
          
        }
        <div className='w-full h-[250px] gradient absolute bottom-0 left-0' />
        <ContentWrapper>
            <div className='flex flex-col items-center text-white text-center relative max-w-[800px] mx-auto my-0'>
                <span className='text-[50px] font-[700px] md:mb-0 md:text-[90px]'>Welcome</span>
                <span className='text-[18px] font-[500px] mb-[40px] md:text-[24px]'>
                  Millions pf movies, 
                  Tv shows and people to discover.
                </span>

                <div className='flex items-center justify-center w-[100%] '>
                  <input
                  style={{"width":''}}
                  className='w-[calc(100%-100px)] text-black h-[50px] bg-white outline-none rounded-l-[30px]  py-0 px-[15px] text-[14px]  md:h-[60px] md:text-[20px] md:py-0 md:px-[30px] md:w-[calc(100%-150px)]'
                    type='text'
                    placeholder='Search..'
                    onChange={(e)=> setQuery(e.target.value)}
                    onKeyUp={serachQueryHandler}
                  />
                  <button className='w-[100px] h-[50px]  text-white outline-none border-0 rounded-r-[30px]  text-[16px] cursor-pointer md:w-[150px] md:h-[60px] md:text-[18px]' style={{backgroundImage: "linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)" }} >Search</button>
                </div>
              
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner