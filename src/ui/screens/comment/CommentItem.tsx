import React from "react";
import { View } from "react-native";
import { CommentInfoLayout } from "./CommentInfolayout";
import { CommentReviewLayout } from "./CommentReviewLayout";
import { postObj } from "../../../models/res_model/PostModel";

type Props = {
  item : any,
  postData : postObj,
  videoReviewLoad : boolean
}

export const CommentItem = React.memo<Props>((props) =>
{
  const checkItem = () =>
  {
    switch (props.item.name)
    {
      case "header":
        return (
          <CommentInfoLayout
            postData={props.postData}/>
        )
      case "review":
        return (
          <CommentReviewLayout
            videoReviewLoad={props.videoReviewLoad}/>
        )
    }
  }

  return(
    <View>
      {checkItem()}
    </View>
  )
})
