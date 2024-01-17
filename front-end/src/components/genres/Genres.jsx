import React from 'react'
import { useSelector } from 'react-redux'

const Genres = ({data}) => {
    const {genres} = useSelector((state)=>(state.home))
  return (
    <div className='flex gap-[5px] '>{data?.map((item)=>{
        return(
            <div key={item} className='bg-[#da2f68] py-[3px] px-[5px] text-[12px] rounded-[4px] text-white whitespace-nowrap'>{genres[item]?.name}</div>
        )
    })}</div>
  )
}

export default Genres