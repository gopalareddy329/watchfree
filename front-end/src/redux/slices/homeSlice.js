import { createSlice } from '@reduxjs/toolkit'



export const homeSlice = createSlice({
  name: 'home',
  initialState:{
    languages:{},
    genres:{},
    type:"movies"

  },
  reducers: {
    getLanguages:(state,action) =>{
      state.languages = action.payload;
    },
    getGenres:(state,action) => {
      state.genres = action.payload
    },
    setType:(state,action)=>{
      state.type=action.payload
    }
  },
})

export const { getLanguages, getGenres,setType } = homeSlice.actions

export default homeSlice.reducer