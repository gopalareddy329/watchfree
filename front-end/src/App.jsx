import React, { useEffect } from 'react'
import { getGenres} from './redux/slices/homeSlice'
import { useDispatch } from 'react-redux'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import useFetch from './hooks/useFetch'


const App = () => {
  const dispatch = useDispatch()

  

  
  const {data,error,loading} = useFetch(`/getgenres/`)
  useEffect(()=>{
      var all = {}
      data?.map((item)=>{
        return all[item.id] = item
      })
      
      dispatch(getGenres(all))

  },[data])


  if(error){return(<div><h1>Something went to wrong </h1></div>)}

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