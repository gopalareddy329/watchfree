import React from "react";
import {FaFacebookF,FaInstagram,FaTwitter,FaLinkedin} from "react-icons/fa";

import ContentWrapper from "../contentWrapper/ContentWrapper";



const Footer = () => {
  const menuItemClass = "transition-all ease duration-[0.3s] cursor-pointer text-[12px] md:text-[16px] hover"
    return (
        <footer className="bg-[#020c1b] flex  py-[50px] w-full text-white relative ">
            <ContentWrapper classname="flex w-full mx-auto items-center flex-col">
                <ul className="flex list-none items-center justify-center gap-[15px] mb-[20px] md:mb-[30px] md:gap-[30px] ">
                    <li className={menuItemClass}>Terms Of Use</li>
                    <li className={menuItemClass}>Privacy-Policy</li>
                    <li className={menuItemClass}>About</li>
                    <li className={menuItemClass}>Blog</li>
                    <li className={menuItemClass}>FAQ</li>
                </ul>
                <div className="text-[12px] leading-[20px] opacity-[0.5] text-center max-w-[800px] mb-[20px] md:text-[14px] md:mb-[30px]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                </div>
                <div className="flex itmes-center justify-center gap-[10px] ">
                    <span className="w-[50px] h-[50px] rounded-[50%] bg-[#04152d] flex items-center justify-center cursor-pointer transition-all ease duration-[0.3s] hover ">
                        <FaFacebookF />
                    </span>
                    <span className="w-[50px] h-[50px] rounded-[50%] bg-[#04152d] flex items-center justify-center cursor-pointer transition-all ease duration-[0.3s] hover">
                        <FaInstagram />
                    </span>
                    <span className="w-[50px] h-[50px] rounded-[50%] bg-[#04152d] flex items-center justify-center cursor-pointer transition-all ease duration-[0.3s] hover">
                        <FaTwitter />
                    </span>
                    <span className="w-[50px] h-[50px] rounded-[50%] bg-[#04152d] flex items-center justify-center cursor-pointer transition-all ease duration-[0.3s] hover">
                        <FaLinkedin />
                    </span>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer;