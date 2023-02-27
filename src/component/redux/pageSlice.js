import { createSlice } from '@reduxjs/toolkit'

const initialState={
  degination_type: '',
  mechanic_name: '',
  data:[]
}

export const pageSlice = createSlice({
    name: 'pageslice',
  initialState,
  reducers: {
    degination:(state,action)=>{
    state.degination_type =action.payload;
},
    mechanic_name:(state,action)=>{
      console.log(action.payload,'inn state mechanic name')
    state.mechanic_name = action.payload
},
scannerData:(state,action)=>{
        console.log(action.payload,'innnn state')
        state.data=action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { degination,scannerData,mechanic_name } = pageSlice.actions

export default pageSlice.reducer