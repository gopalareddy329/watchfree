import { useState,useEffect } from "react"
import {FetchMovieData} from '../utils/api'

const useFetch  = (url) => {
  const [data,setData] = useState(null)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  
  useEffect(()=>{
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () =>{
            setLoading(true)
            const data = await FetchMovieData(signal,url).then((res)=>{
                setData(res)
            })
            if(data?.error){
                  setError(data.error)
            }
            
            setLoading(false)
          }
          fetchData()
          return()=>{
            abortController.abort();
          }
  },[url])
  return {data , loading , error}
}

export default useFetch;