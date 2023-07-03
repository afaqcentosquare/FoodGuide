import React from 'react';
import { StyleSheet, View } from "react-native";
import { CheckoutHeaderLayout } from "./CheckoutHeaderLayout";
import { CheckoutOrderLayout } from "./CheckoutOrderLayout";

type Props = {
  item : any,
}

export const CheckoutItem = React.memo<Props>((props) =>
{
  const checkItem = () =>
  {
    switch (props.item.name)
    {
      case "header":
        return (
          <CheckoutHeaderLayout/>
        )
      case "order":
        return (
          <CheckoutOrderLayout/>
        )
    }
  }

  return(
    <View>
      {checkItem()}
    </View>
  )
})

const styles = StyleSheet.create({

})
