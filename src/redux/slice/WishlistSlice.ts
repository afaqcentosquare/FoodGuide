import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { likeFoodObj, likeResObj } from "../../models/res_model/WishlistModel";

export interface WishlistState {
  likeFoodList : Array<likeFoodObj>,
  likeRestaurantList : Array<likeResObj>,
  likeResLoad : boolean,
  likeFoodLoad : boolean,
  wishListCheckInternet : any,
  likeCheck : boolean
}

const initialState : WishlistState = {
  likeFoodList : [],
  likeRestaurantList : [],
  likeResLoad : false,
  likeFoodLoad : false,
  wishListCheckInternet : false,
  likeCheck : false
}

export const WishlistSlice = createSlice({
  name : 'wishlist',
  initialState,
  reducers : {
    setLikeFoodList(state,action : PayloadAction<Array<likeFoodObj>>)
    {
      state.likeFoodList = action.payload
    },
    setLikeRestaurantList(state,action : PayloadAction<Array<likeResObj>>)
    {
      state.likeRestaurantList = action.payload
    },
    setLikeResLoad(state,action : PayloadAction<boolean>)
    {
      state.likeResLoad = action.payload
    },
    setLikeFoodLoad(state,action : PayloadAction<boolean>)
    {
      state.likeFoodLoad = action.payload
    },
    setWishlistCheckInternet(state,action : PayloadAction<any>)
    {
      state.wishListCheckInternet = action.payload
    },
    setLikeCheck(state,action : PayloadAction<boolean>)
    {
      state.likeCheck = action.payload
    },
  }
})

export const {
  setLikeFoodList,
  setLikeRestaurantList,
  setLikeFoodLoad,
  setLikeResLoad,
  setWishlistCheckInternet,
  setLikeCheck
} = WishlistSlice.actions
export default WishlistSlice.reducer
