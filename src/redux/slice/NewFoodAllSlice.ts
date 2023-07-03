import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { homeFoodObj } from "../../models/res_model/HomeModel";

export interface NewFoodAllState {
  foodDataList : Array<homeFoodObj>,
  newFoodAllDataLoad : boolean,
  newFoodAllFooterLoading : boolean,
  newFoodAllNoMoreData : boolean,
}

const initialState : NewFoodAllState = {
  foodDataList : [],
  newFoodAllDataLoad : true,
  newFoodAllFooterLoading : false,
  newFoodAllNoMoreData : false,
}

export const NewFoodAllSlice = createSlice({
  name : 'newFood',
  initialState,
  reducers : {
    setFoodDataList(state,action : PayloadAction<Array<homeFoodObj>>)
    {
      state.foodDataList = action.payload
    },
    setNewFoodAllDataLoad(state,action : PayloadAction<boolean>)
    {
      state.newFoodAllDataLoad = action.payload
    },
    setNewFoodAllFooterLoading(state,action : PayloadAction<boolean>)
    {
      state.newFoodAllFooterLoading = action.payload
    },
    setNewFoodAllNoMoreData(state,action : PayloadAction<boolean>)
    {
      state.newFoodAllNoMoreData = action.payload
    },
  }
})

export const {
  setFoodDataList,
  setNewFoodAllDataLoad,
  setNewFoodAllFooterLoading,
  setNewFoodAllNoMoreData
} = NewFoodAllSlice.actions
export default NewFoodAllSlice.reducer
