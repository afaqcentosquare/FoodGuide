import React, { FC, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { useAppDispatch } from "../../../redux";
import { postObj } from "../../../models/res_model/PostModel";
import { BackHandler } from "react-native";
import { VideoDetailView } from "./VideoDetailView";
import {
  setFooterVideoDetailLoading,
  setNoMoreDataVideoDetail,
  setVideoDetailDataLoad,
} from "../../../redux/slice/VideoDetailSlice";

type Props = {}

type videoDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

const VideoDetailController : FC<Props> = () =>
{
  const navigation = useNavigation<videoDetailNavProp>();
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const [postVideoList,setPostVideoList] = useState<Array<postObj>>([])
  let [page,setPage] = useState(1);

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
        dispatch(setFooterVideoDetailLoading(true))
        dispatch(setNoMoreDataVideoDetail(false))
        getVideosData()
      }
      else
      {
        dispatch(setFooterVideoDetailLoading(false))
        dispatch(setNoMoreDataVideoDetail(true))
      }
    })
  }

  function getVideosData()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      //dispatch(setVideoDetailDataLoad(true))
      const postRef =
        database()
          .ref()
          .child("Post")
          .limitToFirst(page)
      postRef.on('value',(postSnap)  =>
      {
        // setPostVideoList([])
        let postArr : Array<postObj>  = []

        // @ts-ignore
        postSnap.forEach((postChildSnap) =>
        {
          postArr.push(postChildSnap.val())
        })
        setPostVideoList(postArr)
        dispatch(setVideoDetailDataLoad(false))
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
    <VideoDetailView
      postVideoList={postVideoList}
      onReachEnd={() => onReachEnd()}/>
  )
}

export default VideoDetailController ;
