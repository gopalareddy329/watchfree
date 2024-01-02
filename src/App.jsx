import React, { useEffect, useState } from 'react'
import { FetchMovieData } from './utils/api'
const App = () => {
  const [inc,setinc]=useState(0)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  
  useEffect(()=>{
    const abortController = new AbortController();
    const signal = abortController.signal;
    const fetchData = async () =>{
      setLoading(true)
      const res = await FetchMovieData(signal);
      if(res?.error){
        setError(res.error)
      }
      setLoading(false)
    }
    fetchData()
    return()=>{
      abortController.abort();
    }
  },[inc])
  if(error){return(<div><h1>Something went to wrong</h1></div>)}

  return (
    <div>
      {loading && <div>Loading</div>}
     
        <button onClick={()=>{setinc(inc+1)}}>call</button>
      
      
    </div>
  )
}

export default App