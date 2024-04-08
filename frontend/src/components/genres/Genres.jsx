import React from 'react'
import { useSelector } from 'react-redux'

const Genres = ({data}) => {
  return (
    <div  className='flex gap-[5px] '>
          {data?.map((item,key)=>(
      
            <div key={key} className='bg-[--color-third] py-[3px] px-[5px] text-[12px] rounded-[4px] text-white whitespace-nowrap'>{item}</div>
        
          ))}
          
        </div>
  )
}

export default Genres