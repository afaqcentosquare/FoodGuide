import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { inboxObj } from "../../models/res_model/InboxModel";

export interface InboxState {
  inboxList : Array<inboxObj>,
  inboxLoad : boolean,
  checkInboxInternetConnection : any
}

const initialState : InboxState = {
  inboxList : [],
  inboxLoad : false,
  checkInboxInternetConnection : false
}

export const InboxSlice = createSlice({
  name : 'inbox',
  initialState,
  reducers : {
    setInboxList(state,action : PayloadAction<Array<inboxObj>>)
    {
      state.inboxList = action.payload
    },
    setInboxLoad(state,action : PayloadAction<boolean>)
    {
      state.inboxLoad = action.payload
    },
    setCheckInboxInternetConnection(state,action : PayloadAction<any>)
    {
      state.checkInboxInternetConnection = action.payload
    },
  }
})

export const {
  setInboxList,
  setInboxLoad,
  setCheckInboxInternetConnection
} = InboxSlice.actions
export default InboxSlice.reducer
