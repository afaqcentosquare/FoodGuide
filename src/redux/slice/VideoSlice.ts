import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface VideoState {
  isVideoLoad : boolean,
  footerLoading : boolean,
  noMoreData : boolean,
  videoDataLoad : boolean,
  selectResName : string,
  selectResId : string,
}

const initialState : VideoState = {
  isVideoLoad : false,
  footerLoading : false,
  noMoreData : false,
  videoDataLoad : true,
  selectResName : '',
  selectResId : ''
}

export const VideoSlice = createSlice({
  name : 'video',
  initialState,
  reducers : {
    setIsVideoLoad(state,action : PayloadAction<boolean>)
    {
      state.isVideoLoad = action.payload
    },
    setFooterLoading(state,action : PayloadAction<boolean>)
    {
      state.footerLoading = action.payload
    },
    setNoMoreData(state,action : PayloadAction<boolean>)
    {
      state.noMoreData = action.payload
    },
    setVideoDataLoad(state,action : PayloadAction<boolean>)
    {
      state.videoDataLoad = action.payload
    },
    setSelectResName(state,action : PayloadAction<string>)
    {
      state.selectResName = action.payload
    },
    setSelectResId(state,action : PayloadAction<string>)
    {
      state.selectResId = action.payload
    },
  }
})

export const {
  setIsVideoLoad,
  setFooterLoading,
  setNoMoreData,
  setVideoDataLoad,
  setSelectResName,
  setSelectResId
} = VideoSlice.actions
export default VideoSlice.reducer
