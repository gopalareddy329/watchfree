import React from 'react'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Register from './signUp/Register'
const Authentication = () => {
  return (
    <ContentWrapper classname="flex mx-auto min-h-[80vh]">
        <div className='mt-20  flex justify-center w-full items-center'>
            <div>
                <div style={{background: "linear-gradient(to 45deg, #6bff7e, #232773)" }} >
                    <Register/>
                </div>
                <div>
                    
                </div>

            </div>
        </div>
    </ContentWrapper>
  )
}

export default Authentication