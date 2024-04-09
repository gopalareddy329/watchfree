
import React, { useState } from "react";
import { Rating } from "primereact/rating";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { ApiBase } from "../../../utils/base_api";
export default function RatingInput({authToken,movieId}) {
    const [value, setValue] = useState(null);
    const [message,setMessage]=useState(null);
    const [loading,setLoading]=useState(false)

    const handleRating = async(e)=>{
        setLoading(true)
        setValue(e.value)
        try{
            const res=await fetch(ApiBase+"/update_rating/",{
                method:"POST",
                headers:{
                    'Authorization': `Bearer `+String(authToken.access),
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({'movieId':movieId,'rating':e.value})
            })
            const response=await res.json()
            if(res.ok){
                setMessage("Thanks for the rating...")
            }
            else{
                throw response
            }

        }
        catch(err){
            setMessage(err.error)
            setValue(err.value)
        }
        setLoading(false)

    }

    return (
        <div className="card flex items-center gap-5">
            <Rating value={value} onChange={handleRating}
                cancel={false}
                onIcon={<FaStar className="text-yellow-300" size={40}/>}
                offIcon={<CiStar size={40}/>}
                readOnly={loading}
            />
            <strong>{message && (message)}</strong>
        </div>
    );
}
        