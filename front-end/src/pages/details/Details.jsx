import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './detailsBanner/DetailsBanner'

const Details = () => {
    const {mediaType,id}= useParams()
    const {data,loading} = useFetch(`/getdetails/${mediaType}/${id}/`)
    console.log(data)
  return (
    <div>
        <DetailsBanner />
    </div>
  )
}

export default Details