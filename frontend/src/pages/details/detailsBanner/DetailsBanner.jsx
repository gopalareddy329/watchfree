import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.css";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/rating/Rating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import {PlayIcon} from '../PlayButton.jsx' 
import VideoPlayer from '../../../components/videoPlayer/VideoPlayer.jsx'

const DetailsBanner = ({video, crew}) => {
    const {mediaType,id}= useParams()
    const {data,loading} = useFetch(`/getdetails/${id}/`)
    const {languages} = useSelector((state)=>(state.home))
    const [show,setShow]=useState(false)
    const [videoId,setVideoId]=useState(null)



  return (
    <div className="w-full h-full   py-[100px]    md:pt-[120px] md:min-h-[700px]">
        {!loading ? (
            <>
                {!!data && (
                    <React.Fragment>
                            <div className="w-full h-full absolute top-0 left-0 opacity-[0.1]">
                              <Img classname="w-full h-full object-fit object-center " src={`${data.herobanner !=="" ? (data.herobanner) : (data.moviedata.img_link)}`}/>
                            </div>

                            <div className="w-full h-[250px] absolute bottom-0 left-0" style={{ background: "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #0c1b31 79.17%)" }}></div>

                            <ContentWrapper classname="mx-auto">
                                     <div className="flex relative h-full  flex-col gap-[25px] md:gap-[50px] md:flex-row">
                                        <div className="flex-shrink-0 ">
                                            <Img classname="w-full block rounded-[12px] md:max-w-[500px] aspect-[139/207] min-w-[300px] h-full    object-fill object-center"  src={data?.moviedata?.img_link}/>
                                                
                                        </div>
                                        <div className="text-white">
                                            <div className="text-[28px] leading-[40px] md:text-[34px] md:leading-[44px]">
                                                {`${data?.moviedata?.title.slice(0,-6)} (${dayjs(data?.moviedata?.title?.slice(-5,-1)).format("YYYY")})`}
                                            </div>
                                            <div className="text-[16px] Salsa leading-[24px] mb-[15px] italic opacity-[0.5] md:text-[20px] md:leading-[28px]">
                                                {data?.moviedata?.tagline}
                                            </div>
                                            <Genres data={data?.moviedata?.genres.split("|")}/>
                                            
                                            <div className="row ">
                                                
                                            
                                                    <div className="flex gap-5 mt-5 items-center">
                                                        <div className='max-w-[60px] max-h-[60px] '><CircleRating rating={data?.moviedata?.rating}/></div> 
                                                        

                                                        <span className="playbtn w-[75%]" onClick={()=>{
                                                            setShow(true)
                                                            setVideoId(data?.moviedata?.youtubeID)
                                                        }}>
                                                                    <PlayIcon />
                                                                    <span className="text">Watch Trailer</span>
                                                                    
                                                        </span>
                                                    </div>
                                                
                                            
                                                <div className="flex Salsa py-5  gap-5 ">
                                                            {data?.moviedata?.languages?.map((item)=>{
                                                                return (<div className="opacity-[0.5]" key={item}>{languages[item]?.name}</div>)
                                                            })}
                                                </div>


                                                

                                                <div className="mb-[25px] ">
                                                        <div className="text-[24px] mb-[10px]">
                                                            Overview
                                                        </div>
                                                        <div className="leading-[24px] Salsa text-[18px] md:pr-">
                                                            {data?.moviedata?.overview}
                                                        </div>
                                                </div>

                                                <div className="flex items-center border-b-[1px]  border-solid border-[rgba(255,255,255,0.1)] py-[15px]  ">

                                                    <div className="mr-[10px] flex items-center flex-wrap">
                                                        <h2 className="font-[600] opacity-1">Status:</h2>
                                                        <p className="mr-[10px] leading-[24px] Salsa opacity-[0.5]">{data?.moviedata?.status || "Released"}</p>
                                                    </div>

                                                    <div className="mr-[10px] flex items-center flex-wrap">
                                                        <h2 className="font-[600] opacity-1">Release Date:</h2>
                                                        <p className="mr-[10px] leading-[24px] Salsa opacity-[0.5]">{dayjs(data?.moviedata?.date).format("MMM D, YYYY")}</p>
                                                    </div>

                                                    <div className="mr-[10px] flex items-center flex-wrap">
                                                        <h2 className="font-[600] opacity-1">Duration:</h2>
                                                        <p className="mr-[10px] leading-[24px] Salsa opacity-[0.5]">{data?.moviedata?.duration}</p>
                                                    </div>
                                                    

                                                </div>
                                                
                                            </div>

                                            
                
                                        </div>
                                        
                                     </div>
                                     <VideoPlayer show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
                                     
                                </ContentWrapper>
                                
                            
                    </React.Fragment>
                   
                )}
            </>
        ):(
            <div className="flex relative  flex-col gap-[25px] md:gap-[50px] md:flex-row">
                    <ContentWrapper classname="flex  gap-[50px]">
                        <div className="flex-shrink-0 w-full block rounded-[12px] aspect-[1/1.5] md:max-w-[350px] skeleton "></div>
                        <div className="w-full ">
                            <div className="row  skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
            </div>
        )}
        
        
    </div>
    
  )
}

export default DetailsBanner