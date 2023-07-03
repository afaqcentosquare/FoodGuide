import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { addToCartObj } from "../../models/res_model/AddToCartModel";

export interface AddToCartState {
  foodCountTxt : number,
  addToCartList : Array<addToCartObj>,
  addToCartTotal : number,
  addToCartLoad : boolean,
  addToCartCheckNetwork : any
}

const initialState : AddToCartState = {
  foodCountTxt : 1,
  addToCartList : [],
  addToCartTotal : 0,
  addToCartLoad : true,
  addToCartCheckNetwork : false
}

export const AddToCartSlice = createSlice({
  name : 'addToCart',
  initialState,
  reducers : {
    setFoodCountTxt(state,action : PayloadAction<number>)
    {
      state.foodCountTxt = action.payload
    },
    setAddToCartTotal(state,action : PayloadAction<number>)
    {
      state.addToCartTotal = action.payload
    },
    setAddToCartList(state,action : PayloadAction<Array<addToCartObj>>)
    {
      state.addToCartList = action.payload
    },
    setAddToCartLoad(state,action : PayloadAction<boolean>)
    {
      state.addToCartLoad = action.payload
    },
    setAddToCartCheckNetwork(state,action : PayloadAction<any>)
    {
      state.addToCartCheckNetwork = action.payload
    },
  }
})

export const {
  setFoodCountTxt,
  setAddToCartList,
  setAddToCartTotal,
  setAddToCartLoad,
  setAddToCartCheckNetwork
} = AddToCartSlice.actions
export default AddToCartSlice.reducer
