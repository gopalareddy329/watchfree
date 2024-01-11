import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.css";

const CircleRating = ({ rating }) => {
    return (
        <div className="bg-[#000000] rounded-[50%] text-[34px] p-[2px] h-full">
            <CircularProgressbar
                value={rating}
                maxValue={10}
                text={rating}
                
                styles={buildStyles({
                    pathColor:rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                    textSize:"40px",
                    
                })}
            />
        </div>
    );
};

export default CircleRating;