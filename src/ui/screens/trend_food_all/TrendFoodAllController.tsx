import React, { FC, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { BackHandler } from "react-native";
import database from "@react-native-firebase/database";
import { homeFoodObj } from "../../../models/res_model/HomeModel";
import { useAppDispatch } from "../../../redux";
import { TrendFoodAllView } from "./TrendFoodAllView";
import {
  setTrendFoodAllDataLoad,
  setTrendFoodAllFooterLoading,
  setTrendFoodAllNoMoreData,
} from "../../../redux/slice/TrendFoodAllSlice";

type Props = {}

type foodNavProp = StackNavigationProp<AllScreenStackParamList>;

const TrendFoodAllController : FC<Props> = () =>
{
  const navigation = useNavigation<foodNavProp>();
  const dispatch = useAppDispatch();
  const [trendFoodAllList,setTrendFoodAllList] = useState<Array<homeFoodObj>>([])
  let [trendFoodAllpage,setTrendFoodAllPage] = useState(6);

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
        .child("Home")
        .child("TrendFood")
    postRef.once('value').then((postSnap)  =>
    {
      if(trendFoodAllpage <= postSnap.numChildren())
      {
        dispatch(setTrendFoodAllFooterLoading(true))
        dispatch(setTrendFoodAllNoMoreData(false))
        getNewFoodAllData()
      }
      else
      {
        dispatch(setTrendFoodAllFooterLoading(false))
        dispatch(setTrendFoodAllNoMoreData(true))
      }
    })
  }

  function getNewFoodAllData()
  {
    dispatch(setTrendFoodAllNoMoreData(false))
    const trendFoodAllRef =
      database()
        .ref()
        .child("Home")
        .child("TrendFood")
        .limitToFirst(trendFoodAllpage)
    trendFoodAllRef.on('value',(trendFoodSnap) =>
    {

      let trendFoodAllArr : Array<homeFoodObj> = []
      // @ts-ignore
      trendFoodSnap.forEach((trendFoodChildSnap) =>
      {
        trendFoodAllArr.push(trendFoodChildSnap.val())
      })

      setTrendFoodAllList(trendFoodAllArr);
      dispatch(setTrendFoodAllDataLoad(false))
    })
  }

  function onReachEnd()
  {
    setTrendFoodAllPage(trendFoodAllpage + 4)
    getNumChildren()
  }

  useEffect(() =>
  {
    getNewFoodAllData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <TrendFoodAllView
      trendFoodAllList={trendFoodAllList}
      onReachEnd={() => onReachEnd()}/>
  )
}

export default TrendFoodAllController ;
