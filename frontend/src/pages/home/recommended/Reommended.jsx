import React, { useEffect,useContext } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import CardSlider from '../../../components/cardSlider/CardSlider'
import AuthFetch from '../../../hooks/authFetch'
import AuthContext from '../../../context/AuthContext'

const Reommended = () => {
    const {authToken,logoutUser} =useContext(AuthContext)
    const {data,loading,error}=AuthFetch(authToken,`/get_recommendation`)
    useEffect(()=>{
        console.log(data)
    },[data,error])
  return (

    <div className=' relative    text-white'>
        {(!data.error && data.length >0) && (
            <>
            <ContentWrapper classname="flex mx-auto">
            <span className='text-[24px]  font-normal'>Recommended</span>
            </ContentWrapper>
            <CardSlider  data={data} loading={loading}/>
            </>
        )}
    

    </div>

  )
}

export default Reommended