import React from 'react'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Register from './signUp/Register'
import { useParams } from "react-router-dom";
import Loginpage from './login/Loginpage';

const Authentication = () => {
  const {page}=useParams()
  console.log(page)
  return (
    <div  >
      <div className='w-full h-full absolute top-0 left-0 opacity-[0.1] z-[-1]' style={{backgroundImage:'url("https://wallpapers.com/images/featured/movie-9pvmdtvz4cb0xl37.jpg")'}}/>
      <div className="w-full h-[250px] absolute bottom-0 left-0 z-[-1]" style={{ background: "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #0c1b31 79.17%)" }}></div>
      <ContentWrapper classname="flex mx-auto min-h-[80vh] z-10">
        
          <div className='mt-20  flex justify-center w-full items-center'>
              <div>
                  {page === "register" ?(
                          <div >
                              <Register/>
                          </div>
                  ):(
                          <div >
                              <Loginpage/>
                          </div>
                  )}
                  <div>
                      
                  </div>

              </div>
          </div>
      </ContentWrapper>
    </div>
  )
}

export default Authentication