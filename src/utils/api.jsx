import { useRef } from "react"


const BASE_URL= "/src/utils/db.json"


export const FetchMovieData = async (signal) =>{

    
    try {
        
        const response = await fetch(BASE_URL,{ signal }) // assuming data.json is in the public folder
        
        const data = await response.json()
       
        return data
      } catch (error) {
        
        if (error.name === 'AbortError') {
            console.log('Request was aborted');
            return;
          }
        console.error('Error fetching data:', error);
        return {'error':error}
      }
}