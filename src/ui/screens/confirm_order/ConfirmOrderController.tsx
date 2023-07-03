import React, { FC, useEffect } from "react";
import { ConfirmOrderView } from "./ConfirmOrderView";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

type Props = {}

type confirmOrderNavProp = StackNavigationProp<AllScreenStackParamList>;

const ConfirmOrderController : FC<Props> = () =>
{
  const navigation = useNavigation<confirmOrderNavProp>();

  useEffect(() =>
  {
    setTimeout(() =>
    {
      const userId : any = auth().currentUser?.uid;

      database()
        .ref()
        .child("AddToCart")
        .child(userId)
        .remove().then(r => r)

      navigation.navigate('Main')
    },6000)
  },[])

  return(
    <ConfirmOrderView/>
  )
}

export default ConfirmOrderController ;
