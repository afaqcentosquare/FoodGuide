import React, { FC, useEffect, useState } from "react";
import { ResProfileView } from "./ResProfileView";
import database from "@react-native-firebase/database";
import { postObj } from "../../../../../models/res_model/PostModel";
import { useAppDispatch } from "../../../../../redux";
import { setResProfileVideoList } from "../../../../../redux/slice/ResProfileSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/stores/store";

type Props = {}

const ResProfileController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const { resProfileData,resProfileId }  = useSelector((state: RootState) => state.ResProfile);

  function getVideosData()
  {
    try
    {
      const postRef =
        database()
          .ref()
          .child("Post")
      postRef.once('value').then((postSnap)  =>
      {
        dispatch(setResProfileVideoList([]))

        let postArr : Array<postObj>  = []

        // @ts-ignore
        postSnap.forEach((postChildSnap) =>
        {
          if(postChildSnap.child('resId').val() === resProfileData.resId)
          {
            postArr.push(postChildSnap.val())
          }

        })
        dispatch(setResProfileVideoList(postArr.filter(e => e != null)))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  useEffect(() =>
  {
    getVideosData()
  },[])

  return(
    <ResProfileView/>
  )
}

export default ResProfileController ;
