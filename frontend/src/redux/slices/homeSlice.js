import { createSlice } from '@reduxjs/toolkit'



export const homeSlice = createSlice({
  name: 'home',
  initialState:{

   

  },
  reducers: {
    
  },
})

export const { getLanguages, getGenres,setType } = homeSlice.actions

export default homeSlice.reducer