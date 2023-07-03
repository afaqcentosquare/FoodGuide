import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { searchObj } from "../../models/res_model/SearchModel";

export interface SearchState {
  searchDataLoad : boolean
  searchDataList : Array<searchObj>,
  searchInputTxt : string,
  searchCheckInternet : any
}

const initialState : SearchState = {
  searchDataLoad : true,
  searchDataList : [],
  searchInputTxt : '',
  searchCheckInternet : false
}

export const SearchSlice = createSlice({
  name : 'search',
  initialState,
  reducers : {
    setSearchDataLoad(state,action : PayloadAction<boolean>)
    {
      state.searchDataLoad = action.payload
    },
    setSearchDataList(state,action : PayloadAction<Array<searchObj>>)
    {
      state.searchDataList = action.payload
    },
    setSearchInputTxt(state,action : PayloadAction<string>)
    {
      state.searchInputTxt = action.payload
    },
    setSearchCheckInternet(state,action : PayloadAction<any>)
    {
      state.searchCheckInternet = action.payload
    },
  }
})

export const {
  setSearchDataLoad,
  setSearchDataList,
  setSearchInputTxt,
  setSearchCheckInternet
} = SearchSlice.actions
export default SearchSlice.reducer
