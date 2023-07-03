import React, { FC, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import { setFooterLoading, setNoMoreData, setVideoDataLoad } from "../../../redux/slice/VideoSlice";
import { BackHandler } from "react-native";
import { ResVideoDetailView } from "./ResVideoDetailView";
import { videoObj } from "../../../models/res_model/HomeModel";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";

type Props = {}

type resDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

const ResVideoDetailController : FC<Props> = () =>
{
  const navigation = useNavigation<resDetailNavProp>();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const [postVideoList,setPostVideoList] = useState<Array<videoObj>>([])
  let [page,setPage] = useState(1);
  const { resProfileId } = useSelector((state: RootState) => state.ResProfile);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getNumChildren()
  {
    const postRef =
      database()
        .ref()
        .child("Post")
    postRef.once('value').then((postSnap)  =>
    {
      if(page <= postSnap.numChildren())
      {
        dispatch(setFooterLoading(true))
        dispatch(setNoMoreData(false))
        getVideosData()
      }
      else
      {
        dispatch(setFooterLoading(false))
        dispatch(setNoMoreData(true))
      }
    })
  }

  function getVideosData()
  {
    try
    {
      const postRef =
        database()
          .ref()
          .child("Post")

      postRef.on('value',(postSnap)  =>
      {
        // setPostVideoList([])
        let postArr : Array<videoObj>  = []

        // @ts-ignore
        postSnap.forEach((postChildSnap) =>
        {
          if(postChildSnap.child('postUserId').val() === resProfileId)
          {
            postArr.push(postChildSnap.val())
          }
        })
        setPostVideoList(postArr)
        dispatch(setVideoDataLoad(false))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function onReachEnd()
  {
    setPage(page + 1)
    getNumChildren()
  }

  useEffect(() =>
  {
    getVideosData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <ResVideoDetailView
      postVideoList={postVideoList}
      onReachEnd={() => onReachEnd()}/>
  )
}

export default ResVideoDetailController ;
