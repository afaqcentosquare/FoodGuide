import React, { FC, useEffect } from "react";
import { TermAndConditionView } from "./TermAndConditionView";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";

type Props = {}

type termAndConditionNavProp = StackNavigationProp<AllScreenStackParamList>;

const TermAndConditionController : FC<Props> = () =>
{
  const navigation = useNavigation<termAndConditionNavProp>();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  useEffect(() =>
  {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <TermAndConditionView/>
  )
}

export default TermAndConditionController ;
