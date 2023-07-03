import React, { FC, useEffect } from "react";
import { OrderView } from "./OrderView";
import database from "@react-native-firebase/database";
import { orderObj } from "../../../models/res_model/OrdersModel";
import { useAppDispatch } from "../../../redux";
import { setOrderDataList } from "../../../redux/slice/OrderSlice";

type Props = {}

const OrderController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();

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
    getOrderData()
  },[])

  return(
    <OrderView/>
  )
}

export default OrderController ;
