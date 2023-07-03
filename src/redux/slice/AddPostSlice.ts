import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AddPostState {
  addPostEdtTxt : string,
  addPostImg : string
}

const initialState : AddPostState = {
  addPostEdtTxt : '',
  addPostImg : ''
}

export const AddPostSlice = createSlice({
  name : 'addPost',
  initialState,
  reducers : {
    setAddPostEdtTxt(state,action : PayloadAction<string>)
    {
      state.addPostEdtTxt = action.payload
    },
    setAddPostImg(state,action : PayloadAction<string>)
    {
      state.addPostImg = action.payload
    },
  }
})

export const {
  setAddPostEdtTxt,
  setAddPostImg
} = AddPostSlice.actions
export default AddPostSlice.reducer
