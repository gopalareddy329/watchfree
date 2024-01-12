import React,{useState} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, classname }) => {
    const [isLoading, setIsLoading] = useState(true);
    const handleImageLoad = () => {
        setIsLoading(false);
      };

    return (
        
            
        <div className="w-full h-full">
            {isLoading && (
            <div className='absolute w-full h-full flex-shrink-0'>
                <div className='rounded-[12px] w-full h-full aspect-[1/1.15] mb-[30px] skeleton'>
                    <div className='flex flex-col'>
                        <div className='w-full h-full mb-[10px] skeleton'></div>
                        <div className='w-[75%] h-full  skeleton'></div>
                    </div>
                </div>
            </div>
        )}
        
        <LazyLoadImage
            
            className={classname || ""}
            alt=""
            onLoad={handleImageLoad}
            effect="blur"
            src={src}
            
        /> 

        
        
        
            
        </div>
        
    );
};

export default Img;