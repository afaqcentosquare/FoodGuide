import React, { FC, useEffect } from "react";
import { PrivacyPolicyView } from "./PrivacyPolicyView";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";

type Props = {}

type privacyPolicyNavProp = StackNavigationProp<AllScreenStackParamList>;

const PrivacyPolicyController : FC<Props> = () =>
{
  const navigation = useNavigation<privacyPolicyNavProp>();

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
    <PrivacyPolicyView/>
  )
}

export default PrivacyPolicyController ;
