import React from "react";



const ContentWrapper = ({ children,classname }) => {
    return <div className={`w-full max-w-[1600px]  my-0  py-0 px-[20px] ${classname}`}>{children}</div>;
};

export default ContentWrapper;