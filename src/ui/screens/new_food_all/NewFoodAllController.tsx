import React, { FC, useEffect, useState } from "react";
import { NewFoodAllView } from "./NewFoodAllView";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { BackHandler } from "react-native";
import database from "@react-native-firebase/database";
import { homeFoodObj } from "../../../models/res_model/HomeModel";
import { useAppDispatch } from "../../../redux";
import {
  setNewFoodAllDataLoad,
  setNewFoodAllFooterLoading,
  setNewFoodAllNoMoreData,
} from "../../../redux/slice/NewFoodAllSlice";

type Props = {}

type foodNavProp = StackNavigationProp<AllScreenStackParamList>;

const NewFoodAllController : FC<Props> = () =>
{
  const navigation = useNavigation<foodNavProp>();
  const dispatch = useAppDispatch();
  const [newFoodAllList,setNewFoodAllList] = useState<Array<homeFoodObj>>([])
  let [newFoodAllpage,setNewFoodAllPage] = useState(6);

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
        .child("NewFood")
    postRef.once('value').then((postSnap)  =>
    {
      if(newFoodAllpage <= postSnap.numChildren())
      {
        dispatch(setNewFoodAllFooterLoading(true))
        dispatch(setNewFoodAllNoMoreData(false))
        getNewFoodAllData()
      }
      else
      {
        dispatch(setNewFoodAllFooterLoading(false))
        dispatch(setNewFoodAllNoMoreData(true))
      }
    })
  }

  function getNewFoodAllData()
  {
    dispatch(setNewFoodAllNoMoreData(false))
    const newFoodAllRef =
      database()
        .ref()
        .child("Home")
        .child("NewFood")
        .limitToFirst(newFoodAllpage)
    newFoodAllRef.on('value',(newFoodSnap) =>
    {

      let newFoodAllArr : Array<homeFoodObj> = []
      // @ts-ignore
      newFoodSnap.forEach((newFoodChildSnap) =>
      {
        newFoodAllArr.push(newFoodChildSnap.val())
      })
      setNewFoodAllList(newFoodAllArr);
      dispatch(setNewFoodAllDataLoad(false))
    })
  }

  function onReachEnd()
  {
    setNewFoodAllPage(newFoodAllpage + 4)
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
    <NewFoodAllView
      newFoodAllList={newFoodAllList}
      onReachEnd={() => onReachEnd()}/>
  )
}

export default NewFoodAllController ;
