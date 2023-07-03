import React from 'react';
import { View } from "react-native";
import { ResProfileLayout } from "./ResProfileLayout";
import { ResProfileReviewLayout } from "./ResProfileReviewLayout";
import { ResProfileVideoLayout } from "./ResProfileVideoLayout";

type Props = {
  index : number,
  length : number,
  item : any
}

export const ResProfileItem = React.memo<Props>((props) =>
{
  const checkItem = () =>
  {
    switch (props.item.res_profile_type)
    {
      case "profile":
        return (
          <ResProfileLayout/>
        )
      case "video":
        return (
          <ResProfileVideoLayout/>
        )
      case "review":
        return (
          <ResProfileReviewLayout/>
        )
    }
  }

  return(
    <View>
      {checkItem()}
    </View>

  )
})

