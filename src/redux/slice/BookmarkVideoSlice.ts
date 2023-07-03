import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface BookmarkVideoState {
  bookmarkIsVideoLoad : boolean,
  bookmarkFooterLoading : boolean,
  bookmarkNoMoreData : boolean,
  bookmarkVideoDataLoad : boolean
}

const initialState : BookmarkVideoState = {
  bookmarkIsVideoLoad : false,
  bookmarkFooterLoading : false,
  bookmarkNoMoreData : false,
  bookmarkVideoDataLoad : true
}

export const BookmarkVideoSlice = createSlice({
  name : 'bookmark',
  initialState,
  reducers : {
    setBookmarkIsVideoLoad(state,action : PayloadAction<boolean>)
    {
      state.bookmarkIsVideoLoad = action.payload
    },
    setBookmarkFooterLoading(state,action : PayloadAction<boolean>)
    {
      state.bookmarkFooterLoading = action.payload
    },
    setBookmarkNoMoreData(state,action : PayloadAction<boolean>)
    {
      state.bookmarkNoMoreData = action.payload
    },
    setBookmarkVideoDataLoad(state,action : PayloadAction<boolean>)
    {
      state.bookmarkVideoDataLoad = action.payload
    },
  }
})

export const {
  setBookmarkIsVideoLoad,
  setBookmarkFooterLoading,
  setBookmarkNoMoreData,
  setBookmarkVideoDataLoad
} = BookmarkVideoSlice.actions
export default BookmarkVideoSlice.reducer
