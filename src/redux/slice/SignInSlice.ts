import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SignInState {
  showPassTxt : boolean,
  signInLoad : boolean
}

const initialState : SignInState = {
  showPassTxt : false,
  signInLoad : false
}

export const SignInSlice = createSlice({
  name : 'signIn',
  initialState,
  reducers : {
    setShowPassTxt(state,action : PayloadAction<boolean>)
    {
      state.showPassTxt = action.payload
    },
    setSignInLoad(state,action : PayloadAction<boolean>)
    {
      state.signInLoad = action.payload
    },
  }
})

export const {
  setShowPassTxt,
  setSignInLoad
} = SignInSlice.actions
export default SignInSlice.reducer
