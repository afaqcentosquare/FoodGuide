import React from 'react';
import { StyleSheet, View } from "react-native";
import { FoodDetailListHeader } from "./FoodDetailListHeader";
import { FoodDetailReviewLayout } from "./FoodDetailReviewLayout";

type Props = {
  item : any,
  foodInfo : any
}

export const FoodDetailItem = React.memo<Props>((props) =>
{
  const checkItem = () =>
  {
    switch (props.item.name)
    {
      case "header":
        return (
          <FoodDetailListHeader foodInfo={props.foodInfo}/>
        )
      case "review":
        return (
          <FoodDetailReviewLayout foodInfo={props.foodInfo}/>
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
