import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SignUpState {
  signUpEdtEmail : string,
  signUpEdtPass : string,
  signUpEdtConfirmPass : string,
  signUpLoad : boolean
}

const initialState : SignUpState = {
  signUpEdtEmail : '',
  signUpEdtPass : '',
  signUpEdtConfirmPass : '',
  signUpLoad : false
}

export const SignUpSlice = createSlice({
  name : 'signUp',
  initialState,
  reducers : {
    setSignUpEdtEmail(state,action : PayloadAction<string>)
    {
      state.signUpEdtEmail = action.payload
    },
    setSignUpEdtPass(state,action : PayloadAction<string>)
    {
      state.signUpEdtPass = action.payload
    },
    setSignUpEdtConfirmPass(state,action : PayloadAction<string>)
    {
      state.signUpEdtConfirmPass = action.payload
    },
    setSignUpLoad(state,action : PayloadAction<boolean>)
    {
      state.signUpLoad = action.payload
    },
  }
})

export const {
  setSignUpEdtEmail,
  setSignUpEdtPass,
  setSignUpEdtConfirmPass,
  setSignUpLoad
} = SignUpSlice.actions
export default SignUpSlice.reducer
