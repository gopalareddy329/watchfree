import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SearchResult from './pages/searchResult/SearchResult'
import { AuthProvider } from './context/AuthContext';
import useFetch from './hooks/useFetch'
import Details from './pages/details/Details'
import Authentication from './pages/authentication/Authentication'

const App = () => {


  
  


  return (
    <div>

      
      <BrowserRouter>
          <AuthProvider>
              <Header />
              
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/details/:id" element={<Details />}/>
                  <Route path="/search/:query" element={<SearchResult />}/>
                  <Route path="/auth/:page" element={<Authentication />}/>
                  <Route path="*" element={<Home />}/>
              </Routes>
          </AuthProvider>
      </BrowserRouter>
      <Footer />
      
        
      
      
    </div>
  )
}

export default App