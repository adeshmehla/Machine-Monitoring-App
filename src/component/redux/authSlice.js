import { createSlice } from '@reduxjs/toolkit'

const initialState={
  isAuth: false,
}

export const AuthSlice = createSlice({
    name: 'authslice',
  initialState,
  reducers: {
    isAuth:(state)=>{
    state=!state;
    }
}
})

// Action creators are generated for each case reducer function
export const { degination,scannerData,mechanic_name } = pageSlice.actions

export default pageSlice.reducer