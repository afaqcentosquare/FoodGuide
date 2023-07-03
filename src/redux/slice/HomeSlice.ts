import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  categoryDataObj,
  dealsDataObj,
  homeDataObj,
  homeFoodObj,
  sliderDataObj,
  topResDataObj, videoObj,
} from "../../models/res_model/HomeModel";
import { categoryObj } from "../../models/res_model/CategoryModel";

export interface HomeState {
  homeMainList : any,
  homeDataList : Array<homeDataObj>,
  homeSliderDataList : Array<sliderDataObj>,
  homeFoodCatDataList : Array<categoryObj>,
  homeDealsDataList : Array<dealsDataObj>,
  homeNewFoodDataList : Array<homeFoodObj>,
  homeTrendFoodDataList : Array<homeFoodObj>,
  homeTopResDataList : Array<topResDataObj>,
  homeVideoDataList : Array<videoObj>,
  homeSliderLoad : boolean,
  homeCatLoad : boolean,
  homeTopResLoad : boolean
  homeDealsLoad : boolean,
  homeNewFoodLoad : boolean,
  homeTrendLoad : boolean,
  homeReviewLoad : boolean,
  checkHomeInternet : any
}

const initialState : HomeState = {
  homeMainList : [],
  homeDataList : [],
  homeSliderDataList : [],
  homeFoodCatDataList : [],
  homeDealsDataList : [],
  homeNewFoodDataList : [],
  homeTrendFoodDataList : [],
  homeTopResDataList : [],
  homeVideoDataList : [],
  homeSliderLoad : true,
  homeCatLoad : true,
  homeTopResLoad : true,
  homeDealsLoad : true,
  homeNewFoodLoad : true,
  homeTrendLoad : true,
  homeReviewLoad : true,
  checkHomeInternet : false
}

export const HomeSlice = createSlice({
  name : 'home',
  initialState,
  reducers : {
    setHomeMainList(state,action : PayloadAction<any>)
    {
      state.homeMainList = action.payload
    },
    setHomeDataList(state,action : PayloadAction<Array<homeDataObj>>)
    {
      state.homeDataList = action.payload
    },
    setHomeSliderDataList(state,action : PayloadAction<Array<sliderDataObj>>)
    {
      state.homeSliderDataList = action.payload
    },
    setHomeFoodCatDataList(state,action : PayloadAction<Array<categoryObj>>)
    {
      state.homeFoodCatDataList = action.payload
    },
    setHomeDealsDataList(state,action : PayloadAction<Array<dealsDataObj>>)
    {
      state.homeDealsDataList = action.payload
    },
    setHomeNewFoodDataList(state,action : PayloadAction<Array<homeFoodObj>>)
    {
      state.homeNewFoodDataList = action.payload
    },
    setHomeTrendFoodDataList(state,action : PayloadAction<Array<homeFoodObj>>)
    {
      state.homeTrendFoodDataList = action.payload
    },
    setHomeTopResDataList(state,action : PayloadAction<Array<topResDataObj>>)
    {
      state.homeTopResDataList = action.payload
    },
    setHomeVideoDataList(state,action : PayloadAction<Array<videoObj>>)
    {
      state.homeVideoDataList = action.payload
    },
    setHomeSliderLoad(state,action : PayloadAction<boolean>)
    {
      state.homeSliderLoad = action.payload
    },
    setHomeCatLoad(state,action : PayloadAction<boolean>)
    {
      state.homeCatLoad = action.payload
    },
    setHomeTopResLoad(state,action : PayloadAction<boolean>)
    {
      state.homeTopResLoad = action.payload
    },
    setHomeDealsLoad(state,action : PayloadAction<boolean>)
    {
      state.homeDealsLoad = action.payload
    },
    setHomeNewFoodLoad(state,action : PayloadAction<boolean>)
    {
      state.homeNewFoodLoad = action.payload
    },
    setHomeTrendLoad(state,action : PayloadAction<boolean>)
    {
      state.homeTrendLoad = action.payload
    },
    setHomeReviewLoad(state,action : PayloadAction<boolean>)
    {
      state.homeReviewLoad = action.payload
    },
    setCheckHomeInternet(state,action : PayloadAction<any>)
    {
      state.checkHomeInternet = action.payload
    },
  }
})

export const {
  setHomeMainList,
  setHomeDataList,
  setHomeSliderDataList,
  setHomeFoodCatDataList,
  setHomeDealsDataList,
  setHomeNewFoodDataList,
  setHomeTrendFoodDataList,
  setHomeTopResDataList,
  setHomeVideoDataList,
  setHomeSliderLoad,
  setHomeCatLoad,
  setHomeDealsLoad,
  setHomeTopResLoad,
  setHomeNewFoodLoad,
  setHomeTrendLoad,
  setHomeReviewLoad,
  setCheckHomeInternet,
} = HomeSlice.actions
export default HomeSlice.reducer
