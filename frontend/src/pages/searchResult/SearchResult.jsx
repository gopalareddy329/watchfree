import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component"
import {FetchMovieData} from "../../utils/api"
import { useParams } from "react-router-dom";
import Spinner from '../../components/spinner/Spinner';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import MovieCard from "../../components/movieCard/MovieCard"

const SearchResult = () => {
  const [data,setData] = useState(null)
  const [page,setPage] = useState(1)
  const [loading,setLoading] = useState(true)
  const {query} =useParams()
  
  const FetchData = async () =>{
    
    setLoading(false)
    
    const res = await fetch(`http://127.0.0.1:8000/api/searchdata/?query=${query}&page=1`)
    const response =await res.json()
    if(response){
        setData(response)
        setPage((prev)=>prev+1)
      }


  }
  const fetchNextData = async () => {
    try {
        
      const res = await fetch(`http://127.0.0.1:8000/api/searchdata/?query=${query}&page=${page}`)
      const response =await res.json()
      if(data.results){
        setData({...data,results:[...data.results,...response.results],current_page:response.current_page})

      }
      else{
        setData(res)

      }
      setPage((prev)=>prev+1)
    }
    catch (error) {
      console.error('Error fetching data:', error);
      
    }
   
    

  }
  
  
  useEffect(()=>{
    
    FetchData()
    
  },[query])

  return (
    <div className='min-h-[700px] pt-[100px]'>
      {loading && <Spinner initial={true}/>  }
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0   ? (
            <>
              <div className='text-[24px] leading-[34px] text-white mb-[25px] '>
                  {`Search ${data.count > 1 ? "results":"result"} of ${query}`}
              </div>
              <InfiniteScroll 
              className='flex flex-wrap gap-[10px] mb-[50px] md:gap-[20px]'
              dataLength={data?.results?.length || []}
              next={fetchNextData}
              hasMore={page <= data?.num_pages}
              loader={<Spinner />}
              >
                  {data.results.map((item,key)=>{
                      if(item.mediaType == "person") return;
                      return(
                        <MovieCard key={key} data={item} fromSearch={true} />

                      )
                  })}
              </InfiniteScroll>
            </>

          ):(
            <span className="resultNot">Sorry,Result not found!</span>
          )}

        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult