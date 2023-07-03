import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { homeFoodObj } from "../../models/res_model/HomeModel";

export interface TrendFoodAllState {
  foodDataList : Array<homeFoodObj>,
  trendFoodAllDataLoad : boolean,
  trendFoodAllFooterLoading : boolean,
  trendFoodAllNoMoreData : boolean,
}

const initialState : TrendFoodAllState = {
  foodDataList : [],
  trendFoodAllDataLoad : true,
  trendFoodAllFooterLoading : false,
  trendFoodAllNoMoreData : false,
}

export const TrendFoodAllSlice = createSlice({
  name : 'newFood',
  initialState,
  reducers : {
    setFoodDataList(state,action : PayloadAction<Array<homeFoodObj>>)
    {
      state.foodDataList = action.payload
    },
    setTrendFoodAllDataLoad(state,action : PayloadAction<boolean>)
    {
      state.trendFoodAllDataLoad = action.payload
    },
    setTrendFoodAllFooterLoading(state,action : PayloadAction<boolean>)
    {
      state.trendFoodAllFooterLoading = action.payload
    },
    setTrendFoodAllNoMoreData(state,action : PayloadAction<boolean>)
    {
      state.trendFoodAllNoMoreData = action.payload
    },
  }
})

export const {
  setFoodDataList,
  setTrendFoodAllDataLoad,
  setTrendFoodAllFooterLoading,
  setTrendFoodAllNoMoreData
} = TrendFoodAllSlice.actions
export default TrendFoodAllSlice.reducer
