import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface VideoDetailState {
  isVideoDetailLoad : boolean,
  footerVideoDetailLoading : boolean,
  noMoreDataVideoDetail : boolean,
  videoDetailDataLoad : boolean
}

const initialState : VideoDetailState = {
  isVideoDetailLoad : false,
  footerVideoDetailLoading : false,
  noMoreDataVideoDetail : false,
  videoDetailDataLoad : true
}

export const VideoDetailSlice = createSlice({
  name : 'videoDetail',
  initialState,
  reducers : {
    setIsVideoDetailLoad(state,action : PayloadAction<boolean>)
    {
      state.isVideoDetailLoad = action.payload
    },
    setFooterVideoDetailLoading(state,action : PayloadAction<boolean>)
    {
      state.footerVideoDetailLoading = action.payload
    },
    setNoMoreDataVideoDetail(state,action : PayloadAction<boolean>)
    {
      state.noMoreDataVideoDetail = action.payload
    },
    setVideoDetailDataLoad(state,action : PayloadAction<boolean>)
    {
      state.videoDetailDataLoad = action.payload
    },
  }
})

export const {
  setIsVideoDetailLoad,
  setFooterVideoDetailLoading,
  setNoMoreDataVideoDetail,
  setVideoDetailDataLoad
} = VideoDetailSlice.actions
export default VideoDetailSlice.reducer
