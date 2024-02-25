import React from 'react'
import dayjs from "dayjs"
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"
import CircleRating from '../rating/Rating'
import Genres from "../genres/Genres"
import Img from '../lazyLoadImage/Img'

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const navigate = useNavigate()

  return (
   
        <div
            className="w-[calc(50%-5px)] mb-[25px] cursor-pointer flex-shrink-0 md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)]"
            onClick={() =>
                navigate(`/${data.mediatype || mediaType}/${data.id}`)
            }
        >
            <div className='relative  w-full   rounded-[12px]  aspect-[1/1.5] bg-cover bg-center mb-[30px] flex flex-col items-end justify-between ' style={{"boxShadow":"0 4px 8px rgba(0,0,0,0.1)"}}>
                <div className='  w-full h-full rounded-[12px] overflow-hidden'>
                        <Img classname="w-full h-full   object-cover object-center" src={data?.poster} />
                </div>
                {!fromSearch && (
                    <React.Fragment>
                        <div className='max-md:hidden relative flex flex-wrap justify-end'>
                            <CircleRating rating={data?.rating} />
                        </div>
                        
                        <div className='mt-2 text-[12px] md:text-[16px] opacity-[0.5] mb-2'>
                            <Genres data={data?.genres?.slice(0, 2)} />
                        </div>
                    </React.Fragment>
                )}
            </div>
            <div className="text-white flex flex-col ">
            <span className='text-[12px]  md:text-[18px] whitespace-nowrap text-ellipsis overflow-hidden max-w-full'>{data.title}</span>
            <span className='mt-2 text-[12px] md:text-[16px] opacity-[0.5] mb-2'>{dayjs(data.date).format("MMM D, YYYY")}</span>
            </div>
        </div>


  )
}

export default MovieCard