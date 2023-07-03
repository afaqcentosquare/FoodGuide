import React, { FC, useState } from "react";
import {SignUpView} from './SignUpView';
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import auth from '@react-native-firebase/auth';
import {
  setSignUpEdtConfirmPass,
  setSignUpEdtEmail,
  setSignUpEdtPass,
  setSignUpLoad,
} from "../../../redux/slice/SignUpSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import Snackbar from "react-native-snackbar";

type Props = {}

type signUpNavProp = StackNavigationProp<AllScreenStackParamList>;

const SignUpController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<signUpNavProp>();

  function createUserFirebase(values : any)
  {
    try
    {
      dispatch(setSignUpLoad(true))
      auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then(() =>
        {
          navigation.navigate('UserProfile');
          console.log('User account created & signed in!');
        })
        .catch((error : any) =>
        {
          if (error.code === 'auth/email-already-in-use')
          {
            dispatch(setSignUpLoad(false))
            Snackbar.show({ text: "This email address is already in use!", duration: Snackbar.LENGTH_LONG, });
          }
          else if (error.code === 'auth/invalid-email')
          {
            dispatch(setSignUpLoad(false))
            Snackbar.show({ text:"This email address is invalid!", duration: Snackbar.LENGTH_LONG, });
          }
          else if(error.code === 'auth/network-request-failed')
          {
            dispatch(setSignUpLoad(false))
            Snackbar.show({ text: "Please check internet connection", duration: Snackbar.LENGTH_LONG, });
          }
          else
          {
            dispatch(setSignUpLoad(false))
            console.log("SIGN UP : " + error)
          }
        });
    }
    catch (e)
    {
      console.log("SIGNUP_ERROR : " + e);
    }
  }

  return(
    <SignUpView
      signUpBtn={(values) =>
      {
        createUserFirebase(values)
      }}/>
  )
}

export default SignUpController ;
