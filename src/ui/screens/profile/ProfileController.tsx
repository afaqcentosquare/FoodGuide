import React, { FC, useEffect, useState } from "react";
import { ProfileView } from "./ProfileView";
import Helper from "../../../helper/Helper";
import auth from "@react-native-firebase/auth";
import { setEditUserImg, setEditUserLoc, setEditUserName, setEditUserNum } from "../../../redux/slice/EditUserSlice";
import { useAppDispatch } from "../../../redux";
import { BackHandler } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {}

type profileNavProp = StackNavigationProp<AllScreenStackParamList>;

const ProfileController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<profileNavProp>();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getUserData()
  {
    const userId : any = auth().currentUser?.uid;
    Helper.getUserData(userId)
      .then((result : any) =>
      {
        dispatch(setEditUserName(result.userName))
        dispatch(setEditUserImg(result.userImg))
        dispatch(setEditUserLoc(result.userLoc))
        dispatch(setEditUserNum(result.userPhoneNumber))
      })
  }

  useEffect(() =>
  {
    getUserData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <ProfileView/>
  )
}

export default ProfileController ;
