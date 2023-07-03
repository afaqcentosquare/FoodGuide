import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { resProfileObj } from "../../models/res_model/ResModel";
import { postObj } from "../../models/res_model/PostModel";

export interface ResProfileState {
  resProfileData : resProfileObj,
  resProfileVideoList : Array<postObj>,
  resProfileId : string
}

const initialState : ResProfileState = {
  resProfileData : {
    minOrder : 0,
    closeTime : '',
    deliveredTime : '',
    description : '',
    location : '',
    name : '',
    openTime : '',
    phoneNumber : '',
    rating : 0,
    resId : '',
    resImg : ''
  },
  resProfileVideoList : [],
  resProfileId : ''
}

export const ResProfileSlice = createSlice({
  name : 'resProfile',
  initialState,
  reducers : {
    setResProfileData(state,action : PayloadAction<resProfileObj>)
    {
      state.resProfileData = action.payload
    },
    setResProfileVideoList(state,action : PayloadAction<Array<postObj>>)
    {
      state.resProfileVideoList = action.payload
    },
    setResProfileId(state,action : PayloadAction<string>)
    {
      state.resProfileId = action.payload
    },
  }
})

export const {
  setResProfileData,
  setResProfileVideoList,
  setResProfileId
} = ResProfileSlice.actions
export default ResProfileSlice.reducer
