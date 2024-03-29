
const BASE_URL= "/src/utils/db.json"


export const FetchMovieData = async (signal,url) =>{

    
    try {
        
        const response = await fetch(url,{ if(signal){signal} }) // assuming data.json is in the public folder
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