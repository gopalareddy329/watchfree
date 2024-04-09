import React, { useContext } from 'react'
import AuthContext from '../../../context/AuthContext'

const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
      <div>
        <form onSubmit={loginUser}>
            <div className=" flex flex-col items-center justify-center text-white  px-6 py-0 mx-auto mb-20 lg:py-0">

                <div className="w-full min-w-[350px] max-md:mb-20 mt-20 rounded-lg shadow border min-h-[400px] h-full  sm:max-w-md xl:p-0 bg-black border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                            Login
                        </h1>
                        
                        <input  type="username" name="username" id="username" className=" border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" placeholder="username....." required/>
                        
                        <input type="password" name="password"  id="password" placeholder="password" className="border   sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500" required/>
                            
                       
                        <button type="submit" className="w-full bg-blue-500 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>

                        <p className="text-sm font-light text-gray-500 ">
                            Create a account? <a href="/auth/register" className="font-medium  hover:underline text-primary-500">SignUp here</a>
                        </p>
                
                    </div>
                </div>
            </div>
            
        </form>
         

          

      </div>
  )
}

export default LoginPage