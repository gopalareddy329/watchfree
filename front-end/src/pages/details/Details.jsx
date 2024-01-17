import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './detailsBanner/DetailsBanner'

const Details = () => {
    const {mediaType,id}= useParams()
    const {data,loading} = useFetch(`/getdetails/${mediaType}/${id}/`)
    console.log(data)
  return (
    <div className=' '>
        <DetailsBanner />
        <div className='max-md:min-h-[500px] max-lg:min-h-[300px]'/> 
    </div>
  )
}

export default Details