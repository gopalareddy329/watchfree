import React, { useEffect, useState } from 'react'
import { FetchMovieData } from './utils/api'
import {getApiConfig} from './redux/slices/homeSlice'
import { useDispatch,useSelector } from 'react-redux'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'

const App = () => {
  const dispatch = useDispatch()
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  
  useEffect(()=>{
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () =>{
            setLoading(true)
            const res = await FetchMovieData(signal,"/src/utils/db.json")
            .then((data)=>{
              

              dispatch(getApiConfig(data))
            });
            if(res?.error){
                  setError(res.error)
            }
            
            setLoading(false)
          }
          fetchData()
          return()=>{
            abortController.abort();
          }
  },[])
  if(error){return(<div><h1>Something went to wrong h</h1></div>)}

  return (
    <div>
      {loading && <div>Loading</div>}
      
      <BrowserRouter>
          <Header />
          
          <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/:mediaType/:id" element={<Home />}/>
              <Route path="/search/:query" element={<SearchResult />}/>
              <Route path="/explore/:mediaType" element={<Explore />}/>
              <Route path="*" element={<Home />}/>
          </Routes>
      </BrowserRouter>
      <Footer />
      
        
      
      
    </div>
  )
}

export default App