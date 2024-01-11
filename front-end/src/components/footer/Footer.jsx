import React from "react";
import {FaFacebookF,FaInstagram,FaTwitter,FaLinkedin} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import './style.css'


const Footer = () => {
    const menuItemClass=""
    return (
        <footer className="bg-[#020c1b] flex  py-[50px] w-full text-white relative ">
            <ContentWrapper classname="flex w-full mx-auto items-center flex-col">
                <ul className="flex list-none items-center justify-center gap-[15px] mb-[20px] md:mb-[30px] md:gap-[30px] ">
                    
                    <li className="menuItem hover">Privacy-Policy</li>
                    <li className="menuItem hover">About</li>
                    <li className="menuItem hover">FAQ</li>
                </ul>
                <div className="text-[12px] leading-[20px] opacity-[0.5] text-center max-w-[800px] mb-[20px] md:text-[14px] md:mb-[30px]">
                Welcome to our WatchFree movie streaming platform! 
                Explore a vast collection of movies and 
                TV shows across various genres.
                </div>
                <div className="flex itmes-center justify-center gap-[10px] ">
                    <span className="social-icons hover">
                        <FaFacebookF />
                    </span>
                    <span className="social-icons hover">
                        <FaInstagram />
                    </span>
                    <span className="social-icons hover">
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;