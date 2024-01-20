import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import {FetchMovieData} from "../../utils/api"
import { useParams } from "react-router-dom";
import Spinner from '../../components/spinner/Spinner';


const SearchResult = () => {
  const [data,setData] = useState(null)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(true)
  const {query} =useParams()
  
  const FetchData = async () =>{
    const abortController = new AbortController();
    const signal = abortController.signal;
    setLoading(false)
    await FetchMovieData(signal,'http://127.0.0.1:8000/api/searchdata/').then(
      (res)=>{
        setData(res)
        setPage((prev)=> prev+1)
        
        console.log(res)
      })

    return () => {
      abortController.abort();
    };

  }
  const fetchNextData = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    await FetchMovieData(signal,'http://127.0.0.1:8000/api/searchdata/').then(
      (res)=>{
        if(data.result){
          setData({...data,results:[...data.results,...res.results]})

        }
        else{
          setData(res)
        }
        setPage((prev)=>prev+1)

      })

  }
  
  
  useEffect(()=>{
    FetchData()
    
  },[query])

  return (
    <div className='min-h-[700px] pt-[100px]'>
      {loading && <Spinner initial={true}/>  }
    </div>
  )
}

export default SearchResult