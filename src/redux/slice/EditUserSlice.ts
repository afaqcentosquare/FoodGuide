import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface EditUserState {
  editUserName : string,
  editUserImg : string,
  editUserLoc : string,
  editUserNum : string,
}

const initialState : EditUserState = {
  editUserName : '',
  editUserImg : '',
  editUserLoc : '',
  editUserNum : '',
}

export const EditUserSlice = createSlice({
  name : 'editUser',
  initialState,
  reducers : {
    setEditUserName(state,action : PayloadAction<string>)
    {
      state.editUserName = action.payload
    },
    setEditUserImg(state,action : PayloadAction<string>)
    {
      state.editUserImg = action.payload
    },
    setEditUserLoc(state,action : PayloadAction<string>)
    {
      state.editUserLoc = action.payload
    },
    setEditUserNum(state,action : PayloadAction<string>)
    {
      state.editUserNum = action.payload
    },
  }
})

export const {
  setEditUserName,
  setEditUserImg,
  setEditUserLoc,
  setEditUserNum
} = EditUserSlice.actions
export default EditUserSlice.reducer
