import { createSlice } from '@reduxjs/toolkit'



export const homeSlice = createSlice({
  name: 'home',
  initialState:{
    url:{},
    genres:{},
    type:""

  },
  reducers: {
    getApiConfig:(state,action) =>{
      state.url = action.payload
    },
    getGenres:(state,action) => {
      state.genres = action.payload
    },
    setType:(state,action)=>{
      state.type=action.payload
    }
  },
})

export const { getApiConfig, getGenres,setType } = homeSlice.actions

export default homeSlice.reducer