import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { categoryObj, resCatObj } from "../../models/res_model/CategoryModel";

export interface CategoryState {
  categoryList : Array<categoryObj>,
  categoryResList : Array<resCatObj>,
  categoryInternetCheck : any,
  selectCatType : string,
  catParentLoad : boolean,
  catChildLoad : boolean
}

const initialState : CategoryState = {
  categoryList : [],
  categoryResList : [],
  categoryInternetCheck : false,
  selectCatType : '',
  catParentLoad : true,
  catChildLoad : true
}

export const CategorySlice = createSlice({
  name : 'category',
  initialState,
  reducers : {
    setCategoryList(state,action : PayloadAction<Array<categoryObj>>)
    {
      state.categoryList = action.payload
    },
    setCategoryResList(state,action : PayloadAction<Array<resCatObj>>)
    {
      state.categoryResList = action.payload
    },
    setCategoryInternetCheck(state,action : PayloadAction<any>)
    {
      state.categoryInternetCheck = action.payload
    },
    setSelectCatType(state,action : PayloadAction<string>)
    {
      state.selectCatType = action.payload
    },
    setCatParentLoad(state,action : PayloadAction<boolean>)
    {
      state.catParentLoad = action.payload
    },
    setCatChildLoad(state,action : PayloadAction<boolean>)
    {
      state.catChildLoad = action.payload
    },
  }
})

export const {
  setCategoryList,
  setCategoryResList,
  setCategoryInternetCheck,
  setSelectCatType,
  setCatParentLoad,
  setCatChildLoad
} = CategorySlice.actions
export default CategorySlice.reducer
