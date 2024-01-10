import React, { useRef } from 'react'
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from "react-icons/bs"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import Img from '../lazyLoadImage/Img'
import './style.css'
import CircleRating from '../rating/Rating'

const CardSlider = ({data , loading}) => {
    const slideControl = useRef()
    const {url} =useSelector((state)=> state.home)
    const navigate = useNavigate();
    const navigation = (e) =>{

    }
    const skItem = () =>{
        return (
            <div className='w-[160px] md:w-[calc(25%-15px)] lg:min-w-[180px] lg:w-[calc(16%-30px)] flex-shrink-0'>
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
    <div ref={slideControl} className='mb-[50px] '>
        <ContentWrapper classname="relative mx-auto">
            <BsFillArrowLeftCircleFill className='absolute z-10 left-[30px] text-gray-1000 top-[44%] transform translate-y-[-50%] cursor-pointer opacity-[0.5] hidden md:block hover:opacity-[0.8] text-[30px]' onClick={()=>{navigation("left")}}/>
            <BsFillArrowRightCircleFill className='right-[30px] text-[30px] text-gray-1000 absolute top-[44%] transform translate-y-[-50%] cursor-pointer opacity-[0.5] hidden z-10  md:block hover:opacity-[0.8]' onClick={()=>{navigation("right")}}/>
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
                <div  className='flex gap-[10px] overflow-hidden mr-[-20px] ml-[-20px] px-[20px] md:gap-[20px]  md:m-0 md:p-0'>
                    {data?.slice(15,23).map((item)=>{
                        const imgUrl = item.posterUrl 
                        const error ="https://user-images.githubusercontent.com/237508/90251955-8b9ace00-de36-11ea-8670-5dc31fc4ba61.png"
                        return(
                            <div key={item.id} className='w-[160px]  cursor-pointer md:w-[calc(25%-15px)] lg:min-w-[180px] lg:w-[calc(17%-40px)] flex-shrink-0 p-[10px]'>
                                <div className=' w-full  rounded-[12px] bg-[#d6e5f7]  aspect-[1/1.5] bg-cover bg-center mb-[30px] flex flex-col items-center justify-start  ' style={{"boxShadow":"0 4px 8px rgba(0,0,0,0.1)"}}>
                                    
                                        <div className='h-[85%] w-full'>
                                            <Img  src={imgUrl} noImg={error} classname="w-full h-full  rounded-t-[12px] rounded-b-[12px]   object-fill object-center"/>
                                            
                                        </div>
                                        <div className='text-black flex flex-col p-2 w-full Salsa'>
                                                <span className='text-[12px] self-center  md:text-[18px]'>{item.title}</span>
                                                <div className='w-full flex items-center justify-between h-full gap-1'>
                                                    <span className='mt-2 text-[16px] opacity-[0.5] mb-2'>{item?.year}</span>
                                                    {/* <span className=' h-[30px] w-[30px]'><CircleRating rating={3}/></span> */}
                                                </div>
                                                
                                                
                                        </div>
                                        
                                    
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