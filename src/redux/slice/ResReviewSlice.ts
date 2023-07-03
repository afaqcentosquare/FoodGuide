import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { resReviewObj } from "../../models/res_model/ResReviewModel";

export interface ResReviewState {
  resReviewRating : string,
  resReviewTxt : string,
  resReviewList : Array<resReviewObj>,
  edtResReviewTxt : string,
  edtResReviewRating : number,
  edtResReviewResImg : string,
  edtResReviewResName : string,
  showResReviewSheet : boolean,
  resReviewLoad : boolean
}

const initialState : ResReviewState = {
  resReviewRating : '',
  resReviewTxt : '',
  resReviewList : [],
  edtResReviewTxt : '',
  edtResReviewRating : 0,
  edtResReviewResImg : '',
  edtResReviewResName : '',
  showResReviewSheet : false,
  resReviewLoad : true
}

export const ResReviewSlice = createSlice({
  name : 'resReview',
  initialState,
  reducers : {
    setResReviewList(state,action : PayloadAction<Array<resReviewObj>>)
    {
      state.resReviewList = action.payload
    },
    setResReviewRating(state,action : PayloadAction<string>)
    {
      state.resReviewRating = action.payload
    },
    setResReviewTxt(state,action : PayloadAction<string>)
    {
      state.resReviewTxt = action.payload
    },
    setEdtResReviewTxt(state,action : PayloadAction<string>)
    {
      state.edtResReviewTxt = action.payload
    },
    setEdtResReviewRating(state,action : PayloadAction<number>)
    {
      state.edtResReviewRating = action.payload
    },
    setEdtResReviewResImg(state,action : PayloadAction<string>)
    {
      state.edtResReviewResImg = action.payload
    },
    setEdtResReviewResName(state,action : PayloadAction<string>)
    {
      state.edtResReviewResName = action.payload
    },
    setShowResReviewSheet(state,action : PayloadAction<boolean>)
    {
      state.showResReviewSheet = action.payload
    },
    setResReviewLoad(state,action : PayloadAction<boolean>)
    {
      state.resReviewLoad = action.payload
    },
  }
})

export const {
  setResReviewList,
  setEdtResReviewRating,
  setEdtResReviewResImg,
  setEdtResReviewResName,
  setShowResReviewSheet,
  setResReviewLoad,
  setEdtResReviewTxt
} = ResReviewSlice.actions
export default ResReviewSlice.reducer
