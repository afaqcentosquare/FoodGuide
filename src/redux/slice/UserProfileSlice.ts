import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserProfileState {
  userProfileImage : string,
  userProfileName : string,
  userProfileOpenTime : string,
  userProfileCloseTime : string,
  userProfileLocation : string,
  userProfileDeliveryTime : string,
  userProfilePhoneNumber : string,
  userProfileDescription : string,
}

const initialState : UserProfileState = {
  userProfileImage : '',
  userProfileName : '',
  userProfileOpenTime : '',
  userProfileCloseTime : '',
  userProfileLocation : '',
  userProfileDeliveryTime : '',
  userProfilePhoneNumber : '',
  userProfileDescription : '',
}

export const UserProfileSlice = createSlice({
  name : 'userProfile',
  initialState,
  reducers : {
    setUserProfileImage(state,action : PayloadAction<string>)
    {
      state.userProfileImage = action.payload
    },
    setUserProfileName(state,action : PayloadAction<string>)
    {
      state.userProfileName = action.payload
    },
    setUserProfileOpenTime(state,action : PayloadAction<string>)
    {
      state.userProfileOpenTime = action.payload
    },
    setUserProfileCloseTime(state,action : PayloadAction<string>)
    {
      state.userProfileCloseTime = action.payload
    },
    setUserProfileLocation(state,action : PayloadAction<string>)
    {
      state.userProfileLocation = action.payload
    },
    setUserProfileDeliveredTime(state,action : PayloadAction<string>)
    {
      state.userProfileDeliveryTime = action.payload
    },
    setUserProfilePhoneNumber(state,action : PayloadAction<string>)
    {
      state.userProfilePhoneNumber = action.payload
    },
    setUserProfileDescription(state,action : PayloadAction<string>)
    {
      state.userProfileDescription = action.payload
    },
  }
})

export const {
  setUserProfileImage,
  setUserProfileName,
  setUserProfileOpenTime,
  setUserProfileCloseTime,
  setUserProfileLocation,
  setUserProfileDeliveredTime,
  setUserProfilePhoneNumber,
  setUserProfileDescription
} = UserProfileSlice.actions
export default UserProfileSlice.reducer
