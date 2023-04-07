import { createSlice } from '@reduxjs/toolkit'

const initialState={
  degination_type: '',
  mechanic_name: '',
  isAuth:false,
  // breakdownTime:0,
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
    state.mechanic_name = action.payload
},
scannerData:(state,action)=>{
        state.data=action.payload;
    },
    isAuth:(state,payload)=>{
      state.isAuth=payload.action;
      },
      // breakdownStartTime:(state,action)=>{
      // state.breakdownTime=action.payload;
      // },
      // repairStartTime:(state,action)=>{
      // state.breakdownTime=action.payload;
      // },
  },
})

export const { degination,scannerData,mechanic_name,isAuth } = pageSlice.actions

export default pageSlice.reducer