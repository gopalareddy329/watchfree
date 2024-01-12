import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch } from 'react-redux'
import { setType } from '../../redux/slices/homeSlice'
const ContentChange = () => {
    const [choice,setChoice]=useState("movies")
    const dispatch = useDispatch()

    const changeActive = (e) =>{
        setChoice(e.target.name)
        console.log(e.target.name)
    }

    useEffect(()=>{
        dispatch(setType(choice))
    },[choice])
  return (
    <div className='text-white p-5 w-full'>
        <div className='w-full flex justify-center gap-[50px]'>
            <button onClick={changeActive} className={`p-2 ${choice === "movies" && "active"}`} name="movies">Movies</button>
            <button onClick={changeActive} className={`p-2 ${choice === "series" && "active"}`} name="series">Series</button>
        </div>
    </div>
  )
}

export default ContentChange