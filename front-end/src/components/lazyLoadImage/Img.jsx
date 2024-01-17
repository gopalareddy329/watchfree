import React,{useState} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, classname,noImg }) => {
    const [isLoading, setIsLoading] = useState(true);
    const error ="https://user-images.githubusercontent.com/237508/90251955-8b9ace00-de36-11ea-8670-5dc31fc4ba61.png"
    const handleImageLoad = () => {
        setIsLoading(false);
      };

    return (
        
            
        <div className="w-full h-full">
            {isLoading && (
            <div className=' w-full h-full '>
                <div className='rounded-[12px] w-full h-full  skeleton'>
                    <div className='flex flex-col'>
                        <div className='w-full h-full mb-[10px] skeleton'></div>
                        <div className='h-full  skeleton'></div>
                    </div>
                </div>
            </div>
        )}
        
        <LazyLoadImage
            
            className={classname || ""}
            alt=""
            onLoad={handleImageLoad}
            effect="blur"
            onError={(e)=>{e.target.src=error;setIsLoading(false);}}
           
            src={src}
            
        /> 

        
        
        
            
        </div>
        
    );
};

export default Img;