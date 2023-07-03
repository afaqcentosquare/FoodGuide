import React, { FC, useEffect } from "react";
import database from "@react-native-firebase/database";
import { orderObj } from "../../../models/res_model/OrdersModel";
import { useAppDispatch } from "../../../redux";
import { setOrderDataList } from "../../../redux/slice/OrderSlice";
import { OrderDetailView } from "./OrderDetailView";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { setOrderTotal } from "../../../redux/slice/OrderDetailSlice";

type Props = {}

type orderDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

const OrderDetailController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<orderDetailNavProp>();
  // @ts-ignore
  const route = useRoute<foodReviewNavProp['orderData,orderTotal']>();
  const orderData = route.params.orderData;
  const orderTotal = route.params.orderTotal;

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getOrderData()
  {
    const ordersRef =
      database()
        .ref()
        .child("Orders")

    ordersRef.on('value',(orderFoodSnap) =>
    {

      let orderArr : Array<orderObj> = []
      // @ts-ignore
      orderFoodSnap.forEach((orderChildSnap) =>
      {
        orderArr.push(orderChildSnap.val())
      })

      dispatch(setOrderDataList(orderArr))
      // console.log("LIST : " + JSON.stringify(orderArr));
    })
  }

  useEffect(() =>
  {
    dispatch(setOrderTotal(orderTotal))
   // console.log("total : " + orderTotal);
    getOrderData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <OrderDetailView
      orderData={orderData}/>
  )
}

export default OrderDetailController ;
