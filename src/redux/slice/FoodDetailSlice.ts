import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { resProfileObj } from "../../models/res_model/ResModel";
import { postObj } from "../../models/res_model/PostModel";

export interface FoodDetailState {
  resProfileData : resProfileObj,
  foodDetailCheckInternet : any,
  foodDetailReviewLoad : boolean,
  foodVideoThumbnail : postObj,
  foodVideoUrl : string,
}

const initialState : FoodDetailState = {
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
  foodDetailCheckInternet : false,
  foodDetailReviewLoad : true,
  foodVideoThumbnail : {
    postDes : '',
    postVideo : '',
    postKey : '',
    postLocation : '',
    postThumbNail : '',
    postUserId : '',
    resId : '',
    parentCatId : '',
    foodId : ''
  },
  foodVideoUrl : '',
}

export const FoodDetailSlice = createSlice({
  name : 'foodDetail',
  initialState,
  reducers : {
    setResProfileData(state,action : PayloadAction<resProfileObj>)
    {
      state.resProfileData = action.payload
    },
    setFoodDetailCheckInternet(state,action : PayloadAction<any>)
    {
      state.foodDetailCheckInternet = action.payload
    },
    setFoodDetailReviewLoad(state,action : PayloadAction<boolean>)
    {
      state.foodDetailReviewLoad = action.payload
    },
    setFoodVideoThumbnail(state,action : PayloadAction<postObj>)
    {
      state.foodVideoThumbnail = action.payload
    },
    setFoodVideoUrl(state,action : PayloadAction<string>)
    {
      state.foodVideoUrl = action.payload
    },
  }
})

export const {
  setResProfileData,
  setFoodDetailCheckInternet,
  setFoodDetailReviewLoad,
  setFoodVideoThumbnail,
  setFoodVideoUrl
} = FoodDetailSlice.actions
export default FoodDetailSlice.reducer
