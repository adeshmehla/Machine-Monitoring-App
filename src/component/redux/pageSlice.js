import { createSlice } from '@reduxjs/toolkit'

const initialState={
  degination_type: '',
  data:[]
}

export const pageSlice = createSlice({
    name: 'pageslice',
  initialState,
  reducers: {
    degination:(state,action)=>{
    state.degination_type =action.payload;
},
scannerData:(state,action)=>{
        console.log(action.payload,'innnn state')
        state.data=action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { degination,scannerData } = pageSlice.actions

export default pageSlice.reducer