import React, { FC, useEffect, useState } from "react";
import { CheckoutView } from "./CheckoutView";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useAppDispatch } from "../../../redux";
import {
  setCheckoutAddress,
  setCheckoutAlternateNum, setCheckoutDeliveryInstr,
  setCheckoutName, setCheckoutOrderList, setCheckoutOrderNum,
  setCheckoutPhoneNum,
} from "../../../redux/slice/CheckOutSlice";
import Snackbar from "react-native-snackbar";
import { BackHandler } from "react-native";
import { GetDate } from "../../../hooks/DateTime";

type Props = {}

type checkoutNavProp = StackNavigationProp<AllScreenStackParamList>;

const CheckoutController : FC<Props> = () =>
{
  const {
    checkOutOrderNum,
    checkoutName,
    checkoutPhoneNum,
    checkoutAddress,
    checkoutAlternateNum,
    checkoutDeliveryInstr} = useSelector((state: RootState) => state.Checkout);
  // @ts-ignore
  const route = useRoute<checkoutNavProp['orderList']>();
  const navigation = useNavigation<checkoutNavProp>();
  const orderList = route.params.orderList;
  const dispatch = useAppDispatch();
  const [orderNum,setOrderNum] = useState(5000);
  const { addToCartTotal } = useSelector((state: RootState) => state.AddToCart);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function validateCheckoutFields()
  {
    if(checkoutName !== '')
    {
      if(checkoutPhoneNum !== '')
      {
        if(checkoutAlternateNum !== '')
        {
          if(checkoutAddress !== '')
          {
            getOrderNum()
          }
          else
          {
            Snackbar.show({ text: "Please enter address", duration: Snackbar.LENGTH_LONG, });
          }
        }
        else
        {
          Snackbar.show({ text: "Please enter alternate number", duration: Snackbar.LENGTH_LONG, });
        }
      }
      else
      {
        Snackbar.show({ text: "Please enter Phone number", duration: Snackbar.LENGTH_LONG, });
      }
    }
    else
    {
      Snackbar.show({ text: "Please Enter Name", duration: Snackbar.LENGTH_LONG, });
    }
  }

  function placeOrder()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const checkOutkey = database().ref()
        .child("Orders")
        .push();

      const checkOutObj = {
        orderDate : GetDate().toString(),
        orderNum : checkOutOrderNum,
        orderKey : checkOutkey.key,
        orderUserId : userId,
        orderName : checkoutName,
        orderTotal : addToCartTotal,
        orderPhoneNum : checkoutPhoneNum,
        orderAlternateNum : checkoutAlternateNum,
        orderAddress : checkoutAddress,
        orderDeliveryInstruc : checkoutDeliveryInstr,
        orderList : orderList
      }

      checkOutkey
        .set(checkOutObj)
        .then(() =>
        {
          dispatch(setCheckoutName(''))
          dispatch(setCheckoutPhoneNum(''))
          dispatch(setCheckoutAlternateNum(''))
          dispatch(setCheckoutAddress(''))
          dispatch(setCheckoutDeliveryInstr(''))
          navigation.navigate('ConfirmOrder');
        });
    }
    catch (e)
    {
      console.log("USER_PROFILE_ERROR : " + e);
    }
  }

  function getOrderNum()
  {
    try
    {
      const infoRef = database().ref().child("Orders").limitToLast(1)
      infoRef.once('value').then((snap) =>
      {
        let num : number = 0 ;
        // @ts-ignore
        snap.forEach((childSnap) =>
        {
          num = childSnap.child("orderNum").val() + 1;
        })
        dispatch(setCheckoutOrderNum(num))
      })

      placeOrder()
    }
    catch (e)
    {
      console.log("USER_PROFILE_ERROR : " + e);
    }
  }

  useEffect(() =>
  {
    dispatch(setCheckoutOrderList(orderList));

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <CheckoutView
      checkoutBtn={() => validateCheckoutFields()}/>
  )
}

export default CheckoutController ;
