import React, { FC, useEffect } from "react";
import { ResDetailView } from "./ResDetailView";
import { useNavigation,useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import database from "@react-native-firebase/database";
import { menuObj } from "../../../models/res_model/MenuModel";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import {
  setMenuCheckInternet,
  setMenuChildLoad,
  setMenuData,
  setMenuParentLoad, setMenuSelectType,
  setMenuSubData, setResReviewLoad,
} from "../../../redux/slice/ResDetailSlice";
import { setResProfileData, setResProfileId } from "../../../redux/slice/ResProfileSlice";
import NetInfo from "@react-native-community/netinfo";
import Helper from "../../../helper/Helper";
import { setEdtResReviewResImg, setEdtResReviewResName, setResReviewList } from "../../../redux/slice/ResReviewSlice";
import { BackHandler } from "react-native";

type Props = {}

type resDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

const ResDetailController : FC<Props> = () =>
{
  const navigation = useNavigation<resDetailNavProp>();
  // @ts-ignore
  const route = useRoute<resDetailNavProp['res_id,res_name']>();
  const res_id = route.params.res_id ;
  const res_name = route.params.res_name ;
  const resDetail = useSelector((state: RootState) => state.ResDetail);
  const dispatch = useAppDispatch();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getResMenu()
  {
    try
    {
      dispatch(setMenuParentLoad(true))
      dispatch(setMenuChildLoad(true))
      const resMenuRef =
        database()
          .ref()
          .child("Menu")
          .child(res_id)
      resMenuRef.on('value', (resMenuSnap)  =>
      {
        dispatch(setMenuData([]))
        dispatch(setMenuSubData([]))
        let resMenuArr : Array<menuObj>  = []
        // @ts-ignore
        resMenuSnap.forEach((resMenuChildSnap) =>
        {
          resMenuArr.push(resMenuChildSnap.val())
        })
        dispatch(setMenuData(resMenuArr))
        dispatch(setMenuSelectType(resMenuArr[0].menuCatName))
        dispatch(setMenuParentLoad(false))
        dispatch(setMenuChildLoad(false))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function getResReviewData()
  {
    Helper.getResReviews(res_id)
      .then((result : any) =>
      {
        dispatch(setResReviewList(result))
        dispatch(setResReviewLoad(false))
      })
  }

  function getResData()
  {
    Helper.getRestaurantData(res_id)
      .then((result : any) =>
      {
        dispatch(setEdtResReviewResImg(result.resImg))
        dispatch(setEdtResReviewResName(result.name))
        dispatch(setResProfileData(result))
      })
  }

  function internetConnection()
  {
    NetInfo.addEventListener(networkState =>
    {
      dispatch(setMenuCheckInternet(networkState.isConnected))
      if(networkState.isConnected)
      {
        getResReviewData()
        getResMenu()
        getResData()
      }
    });
  }

  useEffect(() =>
  {
    dispatch(setResProfileId(res_id))
    internetConnection()
    getResReviewData()
    getResMenu()
    getResData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <ResDetailView
      headerTitle={res_name}/>
  )
}

export default ResDetailController ;
