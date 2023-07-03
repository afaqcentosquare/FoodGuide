import React, { FC, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { useAppDispatch } from "../../../redux";
import { postObj } from "../../../models/res_model/PostModel";
import { setFooterLoading, setNoMoreData, setVideoDataLoad } from "../../../redux/slice/VideoSlice";
import { BackHandler } from "react-native";
import { BookmarkVideoView } from "./BookmarkVideoView";
import { bookmarkObj } from "../../../models/res_model/BookmarkModel";
import {
  setBookmarkFooterLoading,
  setBookmarkNoMoreData,
  setBookmarkVideoDataLoad,
} from "../../../redux/slice/BookmarkVideoSlice";

type Props = {}

type videoDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

const BookmarkVideoController : FC<Props> = () =>
{
  const navigation = useNavigation<videoDetailNavProp>();
  const dispatch = useAppDispatch();
  const [bookmarkList,setBookmarkList] = useState<Array<bookmarkObj>>([])
  let [page,setPage] = useState(3);

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
        .child("Bookmark")
    postRef.once('value').then((postSnap)  =>
    {
      if(page <= postSnap.numChildren())
      {
        dispatch(setBookmarkFooterLoading(true))
        dispatch(setBookmarkNoMoreData(false))
        getVideosData()
      }
      else
      {
        dispatch(setBookmarkFooterLoading(false))
        dispatch(setBookmarkNoMoreData(true))
      }
    })
  }

  function getVideosData()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      const bookmarkRef =
        database()
          .ref()
          .child("Bookmark")
          .child(userId)
      bookmarkRef.on('value',(bookmarkSnap)  =>
      {
        // setPostVideoList([])
        let bookmarkArr : Array<bookmarkObj>  = []

        // @ts-ignore
        bookmarkSnap.forEach((bookmarkChildSnap) =>
        {
          bookmarkArr.push(bookmarkChildSnap.val())
        })
        setBookmarkList(bookmarkArr.reverse())
        dispatch(setBookmarkVideoDataLoad(false))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function onReachEnd()
  {
    setPage(page + 3)
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
    <BookmarkVideoView
      bookmarkList={bookmarkList}
      onReachEnd={() => onReachEnd()}/>
  )
}

export default BookmarkVideoController ;
