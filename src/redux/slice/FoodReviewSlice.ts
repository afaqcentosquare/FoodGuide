import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { foodReviewObj } from "../../models/res_model/FoodReviewModel";
import { foodObj } from "../../models/res_model/MenuModel";

export interface FoodReviewDetailState {
  foodReviewRating : string,
  foodReviewTxt : string,
  foodReviewList : Array<foodReviewObj>,
  edtFoodReviewTxt : string,
  edtFoodReviewRating : number,
  edtFoodReviewResImg : string,
  edtFoodReviewResName : string,
  showFoodReviewSheet : boolean,
  foodReviewLoad : boolean,
  foodData : foodObj
}

const initialState : FoodReviewDetailState = {
  foodReviewRating : '',
  foodReviewTxt : '',
  foodReviewList : [],
  edtFoodReviewTxt : '',
  edtFoodReviewRating : 0,
  edtFoodReviewResImg : '',
  edtFoodReviewResName : '',
  showFoodReviewSheet : false,
  foodReviewLoad : true,
  foodData : {
    parentCatId : '',
    resId : '',
    foodCatName : '',
    foodDes : '',
    foodId : '',
    foodImg : '',
    foodName : '',
    foodPrice : '',
    foodRating : 0,
  }
}

export const FoodReviewSlice = createSlice({
  name : 'foodReviewDetail',
  initialState,
  reducers : {
    setFoodReviewList(state,action : PayloadAction<Array<foodReviewObj>>)
    {
      state.foodReviewList = action.payload
    },
    setFoodReviewRating(state,action : PayloadAction<string>)
    {
      state.foodReviewRating = action.payload
    },
    setFoodReviewTxt(state,action : PayloadAction<string>)
    {
      state.foodReviewTxt = action.payload
    },
    setEdtFoodReviewTxt(state,action : PayloadAction<string>)
    {
      state.edtFoodReviewTxt = action.payload
    },
    setEdtFoodReviewRating(state,action : PayloadAction<number>)
    {
      state.edtFoodReviewRating = action.payload
    },
    setEdtFoodReviewResImg(state,action : PayloadAction<string>)
    {
      state.edtFoodReviewResImg = action.payload
    },
    setEdtFoodReviewResName(state,action : PayloadAction<string>)
    {
      state.edtFoodReviewResName = action.payload
    },
    setShowFoodReviewSheet(state,action : PayloadAction<boolean>)
    {
      state.showFoodReviewSheet = action.payload
    },
    setFoodReviewLoad(state,action : PayloadAction<boolean>)
    {
      state.foodReviewLoad = action.payload
    },
    setFoodData(state,action : PayloadAction<foodObj>)
    {
      state.foodData = action.payload
    },
  }
})

export const {
  setFoodReviewTxt,
  setFoodReviewList,
  setEdtFoodReviewTxt,
  setEdtFoodReviewRating,
  setEdtFoodReviewResImg,
  setEdtFoodReviewResName,
  setShowFoodReviewSheet,
  setFoodReviewLoad,
  setFoodData
} = FoodReviewSlice.actions
export default FoodReviewSlice.reducer
