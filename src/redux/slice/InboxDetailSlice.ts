import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { resProfileObj } from "../../models/res_model/ResModel";
import { inboxDetailObj } from "../../models/res_model/InboxDetailModel";

export interface InboxDetailState {
  inboxResProfileData : resProfileObj,
  inboxDetailList : Array<inboxDetailObj>,
  inboxDetailMsgTxt : string
}

const initialState : InboxDetailState = {
  inboxResProfileData : {
    minOrder : 0,
    closeTime : '',
    deliveredTime : '',
    description : '',
    location : '',
    name : '',
    openTime : '',
    phoneNumber : '',
    rating : '',
    resId : '',
    resImg : ''
  },
  inboxDetailList : [],
  inboxDetailMsgTxt : ''
}

export const InboxDetailSlice = createSlice({
  name : 'inboxDetail',
  initialState,
  reducers : {
    setInboxDetailMsgTxt(state,action : PayloadAction<string>)
    {
      state.inboxDetailMsgTxt = action.payload
    },
    setInboxResProfileData(state,action : PayloadAction<resProfileObj>)
    {
      state.inboxResProfileData = action.payload
    },
    setInboxDetailList(state,action : PayloadAction<Array<inboxDetailObj>>)
    {
      state.inboxDetailList = action.payload
    },
  }
})

export const {
  setInboxResProfileData,
  setInboxDetailList,
  setInboxDetailMsgTxt
} = InboxDetailSlice.actions
export default InboxDetailSlice.reducer
