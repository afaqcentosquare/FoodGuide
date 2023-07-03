import React, { FC, useEffect } from "react";
import { AddToCartView } from "./AddToCartView";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { useAppDispatch } from "../../../redux";
import {
  setAddToCartCheckNetwork,
  setAddToCartList,
  setAddToCartLoad,
  setAddToCartTotal,
  setFoodCountTxt,
} from "../../../redux/slice/AddToCartSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { addToCartObj } from "../../../models/res_model/AddToCartModel";
import NetInfo from "@react-native-community/netinfo";
import { BackHandler } from "react-native";

type Props = {}

type addToCartNavProp = StackNavigationProp<AllScreenStackParamList>;

const AddToCartController : FC<Props> = () =>
{
  const navigation = useNavigation<addToCartNavProp>();
  const dispatch = useAppDispatch();
  const { foodCountTxt } = useSelector((state: RootState) => state.AddToCart);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getAddToCartData()
  {
    try
    {
      dispatch(setAddToCartLoad(true))
      const userId : any = auth().currentUser?.uid;

      const addToCartRef =
        database()
          .ref()
          .child("AddToCart")
          .child(userId)
      addToCartRef.on('value', (addToCartSnap)  =>
      {
        dispatch(setAddToCartList([]))

        let addToCartArr : Array<addToCartObj>  = []

        // @ts-ignore
        addToCartSnap.forEach((addToCartChildSnap) =>
        {
          addToCartArr.push(addToCartChildSnap.val())
        })
        dispatch(setAddToCartList(addToCartArr))
        dispatch(setAddToCartLoad(false))

        let price = 0 ;
        addToCartArr.forEach((item) =>
        {
          price += parseInt(item.price) * item.quantity  ;
          dispatch(setAddToCartTotal(price))
        })
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function addToCartNetwork()
  {
    NetInfo.addEventListener(networkState =>
    {
      dispatch(setAddToCartCheckNetwork(networkState.isConnected))
      if(networkState.isConnected)
      {
        getAddToCartData()
      }
    });
  }

  useEffect(() =>
  {
    addToCartNetwork()
    getAddToCartData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <AddToCartView/>
  )
}

export default AddToCartController ;
