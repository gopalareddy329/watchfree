import React, { useEffect, useRef,useState } from 'react'
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from "react-icons/bs"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import Img from '../lazyLoadImage/Img'
import dayjs from "dayjs";
import CircleRating from '../rating/Rating'
import Genres from '../genres/Genres'


const CardSlider = ({data,loading }) => {
    const slideControl = useRef()
    const {url} =useSelector((state)=> state.home)
    const navigate = useNavigate();

    
    const navigation = (e) =>{
        const scroll = slideControl.current

        const scrollAmount = e === "left" ? scroll.scrollLeft - (scroll.offsetWidth + 20):scroll.scrollLeft + (scroll.offsetWidth + 20)
        
        scroll.scrollTo({
            left:scrollAmount,
            behavior:"smooth"
        })
    }
    const skItem = () =>{
        return (
            <div className='w-[160px] md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] flex-shrink-0'>
                <div className='rounded-[12px] wfull aspect-[1/1.15] mb-[30px] skeleton'>
                    <div className='flex flex-col'>
                        <div className='w-full h-[20px] mb-[10px] skeleton'></div>
                        <div className='w-[75%] h-[20px] skeleton'></div>
                    </div>
                </div>
            </div>
        )
    }

  return (
    <div ref={slideControl} className='mb-10 pt-10'>
        <ContentWrapper classname="relative mx-auto">
            <BsFillArrowLeftCircleFill className='text-[30px] text-[#555563] absolute top-[44%] left-[30px] transform translate-y-[-50%] cursor-pointer opacity-[0.8] z-10 hidden md:block hover:opacity-[0.8] ' onClick={()=>{navigation("left")}}/>
            <BsFillArrowRightCircleFill className='text-[30px] text-[#555563] absolute top-[44%] right-[30px] transform translate-y-[-50%] cursor-pointer opacity-[0.8] z-10 hidden md:block hover:opacity-[0.8] ' onClick={()=>{navigation("right")}}/>
            {loading ? 
            (
                <div className='flex gap-[10px] overflow-y-hidden mr-[-20px] ml-[-20px] py-[20px] md:gap-[20px] md:overflow-hidden md:m-0 md:p-0 '>
                       
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                </div>
            )
            :
            (
                <div ref={slideControl}  className='flex gap-[10px] lg:p-5 overflow-y-hidden mr-[-20px] ml-[-20px] px-[20px] md:gap-[20px] md:overflow-hidden   md:m-0 md:p-0'>
                    {data?.map((item)=>{
                        const imgUrl = item.poster 
                        const error ="https://user-images.githubusercontent.com/237508/90251955-8b9ace00-de36-11ea-8670-5dc31fc4ba61.png"
                        return(
                            <div key={item.id} onClick={()=>navigate(`/${item.mediatype}/${item.id}`)}  className='w-[125px]   cursor-pointer md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)] flex-shrink-0 '>
                                <div className='relative  w-full   rounded-[12px]  aspect-[1/1.5] bg-cover bg-center mb-[30px] flex flex-col items-end justify-between ' style={{"boxShadow":"0 4px 8px rgba(0,0,0,0.1)"}}>
                                    
                                        <div className='  w-full h-full rounded-[12px] overflow-hidden'>
                                            <Img  src={imgUrl} noImg={error}  classname="w-full h-full   object-cover object-center"/>
                                            
                                        </div>
                                        <div className=' flex flex-col Salsa   w-full p-[10px]'>
                                                <span className='text-[12px]  md:text-[18px]'>{item.title}</span>

                                                <span className='mt-2 text-[12px] md:text-[16px] opacity-[0.5] mb-2'>{dayjs(item.date).format("MMM D, YYYY")}</span>
                                                <span className='max-md:hidden relative flex flex-wrap justify-end'><Genres data={item.genres}/></span>
                                        </div>
                                       
                                        <span className='absolute right-5 top-3 h-[30px] w-[30px]'><CircleRating rating={item.rating}/></span> 
                                        
                                    
                                </div>
                            </div>
                        )
                    })}

                </div>
            )}
        </ContentWrapper>
    </div>
  )
}

export default CardSlider