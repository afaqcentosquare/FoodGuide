import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { foodObj, menuObj } from "../../models/res_model/MenuModel";
import { postObj } from "../../models/res_model/PostModel";

export interface ResDetailState {
  menuParentLoad : boolean
  menuChildLoad : boolean,
  menuData : Array<menuObj>,
  menuSubData : Array<foodObj>
  menuCheckInternet : any,
  resReviewLoad : boolean,
  menuSelectType : string
}

const initialState : ResDetailState = {
  menuChildLoad : true,
  menuParentLoad : true,
  menuData : [],
  menuSubData : [],
  menuCheckInternet : false,
  resReviewLoad : false,
  menuSelectType : ''
}

export const ResDetailSlice = createSlice({
  name : 'resDetail',
  initialState,
  reducers : {
    setMenuChildLoad(state,action : PayloadAction<boolean>)
    {
      state.menuChildLoad = action.payload
    },
    setMenuParentLoad(state,action : PayloadAction<boolean>)
    {
      state.menuParentLoad = action.payload
    },
    setMenuData(state,action : PayloadAction<Array<menuObj>>)
    {
      state.menuData = action.payload
    },
    setMenuSubData(state,action : PayloadAction<Array<foodObj>>)
    {
      state.menuSubData = action.payload
    },
    setMenuCheckInternet(state,action : PayloadAction<any>)
    {
      state.menuCheckInternet = action.payload
    },
    setResReviewLoad(state,action : PayloadAction<boolean>)
    {
      state.resReviewLoad = action.payload
    },
    setMenuSelectType(state,action : PayloadAction<string>)
    {
      state.menuSelectType = action.payload
    },
  }
})

export const {
  setMenuChildLoad,
  setMenuParentLoad,
  setMenuData,
  setMenuSubData,
  setMenuCheckInternet,
  setResReviewLoad,
  setMenuSelectType
} = ResDetailSlice.actions
export default ResDetailSlice.reducer
