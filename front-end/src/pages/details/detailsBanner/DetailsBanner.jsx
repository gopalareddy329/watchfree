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


const DetailsBanner = ({video, crew}) => {
    const {mediaType,id}= useParams()
    const {data,loading} = useFetch(`/getdetails/${mediaType}/${id}/`)

  return (
    <div className="w-full bg-[#041226]  pt-[100px] mb-[50px] md:mb-0 md:pt-[120px] md:min-h-[700px]">
        {!loading ? (
            <>
                {!!data && (
                    <React.Fragment>
                            <div className="w-full h-full absolute top-0 left-0 opacity-[0.1]">
                              <Img classname="w-full h-full object-cover object-center " src={`${data.herobanner !=="" ? (data.herobanner) : (data.moviedata.poster)}`}/>
                            </div>

                            <div className="w-full h-[250px] absolute bottom-0 left-0" style={{ background: "linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%)" }}></div>

                            <ContentWrapper classname="mx-auto">
                                     <div className="flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row">
                                        <div className="flex-shrink-0 ">
                                            <Img classname="w-full block rounded-[12px] md:max-w-[350px] aspect-[139/207] h-full    object-fill object-center"  src={data?.moviedata?.poster}/>
                                                
                                        </div>
                                        <div className="right">

                                        </div>
                                     </div>
                                </ContentWrapper>
                            
                    </React.Fragment>
                )}
            </>
        ):(
            <div className="flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row">
                    <ContentWrapper classname="flex gap-[50px]">
                        <div className="flex-shrink-0 w-full block rounded-[12px] aspect-[1/1.5] md:max-w-[350px] skeleton "></div>
                        <div className="w-full">
                            <div className="row skeleton"></div>
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