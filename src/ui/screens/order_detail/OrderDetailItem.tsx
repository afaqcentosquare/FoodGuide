import React from 'react';
import { StyleSheet,View } from "react-native";
import { OrderDetailHeaderLayout } from "./OrderDetailHeaderLayout";
import { OrderDetailOrderLayout } from "./OrderDetailOrderLayout";
import { orderObj } from "../../../models/res_model/OrdersModel";

type Props = {
  orderData : orderObj
  item : any,
}

export const OrderDetailItem = React.memo<Props>((props) =>
{
  const checkItem = () =>
  {
    switch (props.item.name)
    {
      case "header":
        return (
          <OrderDetailHeaderLayout
            orderData={props.orderData}/>
        )
      case "order":
        return (
          <OrderDetailOrderLayout
            orderData={props.orderData}/>
        )
    }
  }

  return(
    <View>
      {checkItem()}
    </View>
  )
})

