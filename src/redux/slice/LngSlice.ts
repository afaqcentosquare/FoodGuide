import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface LngState {
  isRtl : any
}

const initialState : LngState = {
  isRtl : false
}

export const LngSlice = createSlice({
  name : 'Lng',
  initialState,
  reducers : {
    setIsRtl(state,action : PayloadAction<any>)
    {
      state.isRtl = action.payload
    },
  }
})

export const {
  setIsRtl
} = LngSlice.actions
export default LngSlice.reducer
