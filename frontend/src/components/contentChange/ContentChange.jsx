import React, { useEffect, useState } from 'react'
import './style.css'
import { setType } from '../../redux/slices/homeSlice'
const ContentChange = () => {
    const choice="movies"
  

   
  return (
    <div className='text-white p-5 w-full'>
        <div className='w-full flex justify-center gap-[50px]'>
            <button  className={`p-2 ${choice === "movies" && "active"}`} name="movies">Movies</button>

        </div>
    </div>
  )
}

export default ContentChange