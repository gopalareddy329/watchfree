import React, { useState,useEffect } from 'react'
import {HiOutlineSearch} from "react-icons/hi"
import {SlMenu} from "react-icons/sl"
import {VscChromeClose} from "react-icons/vsc"
import ContantWrapper from "../contentWrapper/ContentWrapper"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [show,setShow] = useState("bg-transparent");
  const [lastScrollY,setLastScrollY] = useState(0)
  const [mobileMenu,setMobileMenu] = useState(false)
  const [query,setQuery] = useState("")
  const [showSearch,setShowSearch] = useState("");

  
  const serachQueryHandler = (e) => {
    if(e.key ==  'Enter' && query.length > 0){
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false)
      }, 500);
    }
    
  };

  const controllNavbar = () =>{
    if(window.scrollY > 200){
      if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("translate-y-[-60px]")
        
      }else{
        setShow("bg-[#020c1b]")
      }
    }
    else{
      setShow("bg-transparent")
    }
    setLastScrollY(window.scrollY)
  }
  useEffect(()=>{
    const handleResize = () => {
      if(window.innerWidth > 768){
        setMobileMenu(false)
      }
    }
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[])
  useEffect(() => {
    window.scrollTo(0, 0);
    }, [location]);
  useEffect(()=>{
    window.addEventListener("scroll",controllNavbar);
    return ()=>{
      window.removeEventListener("scroll",controllNavbar);
    }
  },[lastScrollY])

  const openSearch = () =>{
    setMobileMenu(false)
    setShowSearch(true)
  }
  const openMobileMenu = () =>{
    setMobileMenu(true)
    setShowSearch(false)

  }

  return (
    <header className={`fixed text-white transform  transition-all ease-in-out duration-500  w-full h-[60px] z-50  flex justify-center  items-center    ${mobileMenu ? "max-md:bg-[#020c1b]":""} ${show}`}>
        
            
              <ContantWrapper>
              <div className={` max-md:z-[-1]   md:w-[30%] left-0 p-5   max-md:absolute md:hidden max-md:h-[200px] transform translate-y-0  transition-all ease-in-out duration-200  w-full  ${mobileMenu ? "max-md:bg-[#020c1b] translate-y-0":"translate-y-[-120px]"}`} />
                <div className='flex h-full justify-between w-full  relative'>
                      <div>
                        <h1 className='font-[700px] text-[20px] p-5'>WATCHFREE</h1>
                        
                      </div>
                     
                      
                      <ul className={`flex gap-10 top-5 p-5 max-md:absolute md:justify-between   max-md:flex-col max-md:justify-center max-md:mt-[5%] ${mobileMenu ? "block ":"max-md:hidden"}`}>
                        <li className="hover"><Link  to="explore/movies"  onClick={()=>{setMobileMenu(false)}}>Movies</Link></li>
                        <li className="hover"><Link  to="explore/series" onClick={()=>{setMobileMenu(false)}}>Series</Link></li>
                        <li className="text-[20px] max-md:hidden "><HiOutlineSearch onClick={openSearch}/></li>
                      </ul>
                      

                      <div className='md:hidden flex gap-5 p-5  text-[20px] '>
                          <HiOutlineSearch onClick={openSearch}/>
                          {mobileMenu ? <VscChromeClose className='cursor-pointer' onClick={()=>{setMobileMenu(false)}}/> : <SlMenu className='cursor-pointer' onClick={openMobileMenu}/>}
                      </div>
                  </div>
                </ContantWrapper>
            {showSearch && 
            <div className='absolute top-[80px]   w-full flex items-center justify-center '>
                <ContantWrapper >
                    <div className='flex  items-center  h-[50px]  mx-auto justify-center  md:h-[50px] '>
                          <input
                          
                          className='w-full text-black h-full   bg-white outline-none   p-5 text-[14px]    '
                            type='text'
                            placeholder='Search..'
                            onChange={(e)=> setQuery(e.target.value)}
                            onKeyUp={serachQueryHandler}
                          />
                         <VscChromeClose className=' bg-white h-full outline-none text-black  text-[25px]  pr-2 ' onClick={()=>{setShowSearch(false)}}/>
                    </div> 
                </ContantWrapper>
            </div>}
        
    </header>
  )
}

export default Header