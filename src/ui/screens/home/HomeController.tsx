import React, { FC, useEffect } from "react";
import { HomeView } from "./HomeView";
import NetInfo from "@react-native-community/netinfo";
import { useAppDispatch } from "../../../redux";
import {
  setCheckHomeInternet,
  setHomeCatLoad,
  setHomeDealsDataList,
  setHomeDealsLoad,
  setHomeFoodCatDataList,
  setHomeMainList,
  setHomeNewFoodDataList,
  setHomeNewFoodLoad,
  setHomeSliderDataList,
  setHomeSliderLoad,
  setHomeTopResDataList,
  setHomeTopResLoad,
  setHomeTrendFoodDataList,
  setHomeTrendLoad,
  setHomeVideoDataList,
} from "../../../redux/slice/HomeSlice";
import { getHomeMainListRes } from "../../../repo/dummy_res/HomeMainRes";
import database from "@react-native-firebase/database";
import {
  dealsDataObj,
  homeFoodObj,
  sliderDataObj,
  topResDataObj, videoObj,
} from "../../../models/res_model/HomeModel";
import { BackHandler } from "react-native";
import {
  setCategoryResList,
  setSelectCatType,
} from "../../../redux/slice/CategorySlice";
import { categoryObj } from "../../../models/res_model/CategoryModel";

type Props = {}

const HomeController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();

  function handleBackButtonClick()
  {
    BackHandler.exitApp();
    return true;
  }

  function getHomeList()
  {
    dispatch(setHomeMainList(JSON.parse(JSON.stringify(getHomeMainListRes().data))))
  }

  function getHomeSliderData()
  {
    const homeSliderRef =
      database()
        .ref()
        .child("Home")
        .child("Slider")
    homeSliderRef.on('value',(homeSliderSnap) =>
    {
      //dispatch(setHomeSliderDataList([]))

      let sliderArr : Array<sliderDataObj> = []
      // @ts-ignore
      homeSliderSnap.forEach((homeSliderChildSnap) =>
      {
        sliderArr.push(homeSliderChildSnap.val())
      })
      dispatch(setHomeSliderDataList(sliderArr))
      dispatch(setHomeSliderLoad(false))
    })
  }

  function getTopResData()
  {
    const homeTopResRef =
      database()
        .ref()
        .child("Home")
        .child("TopRes")
        .limitToLast(6)
    homeTopResRef.on('value',(homeTopResSnap) =>
    {
      //dispatch(setHomeTopResDataList([]))

      let topResArr : Array<topResDataObj> = []
      // @ts-ignore
      homeTopResSnap.forEach((homeTopResChildSnap) =>
      {
        topResArr.push(homeTopResChildSnap.val())
      })
      dispatch(setHomeTopResDataList(topResArr))
      dispatch(setHomeTopResLoad(false))
    })
  }

  function getHomeCatData()
  {
    const resMenuRef =
      database()
        .ref()
        .child("FoodCategory")
    resMenuRef.on('value', (categorySnap)  =>
    {
      dispatch(setCategoryResList([]))

      let foodCatArr : Array<categoryObj> = []
      // @ts-ignore
      categorySnap.forEach((homeCatChildSnap) =>
      {
        foodCatArr.push(homeCatChildSnap.val())
      })
      dispatch(setHomeFoodCatDataList(foodCatArr))
      dispatch(setHomeCatLoad(false))
      dispatch(setSelectCatType(foodCatArr[0].foodCatName))
      dispatch(setCategoryResList(Object.values(foodCatArr[0].Restaurant)))
    })
    /*const homeCatRef =
      database()
        .ref()
        .child("Home")
        .child("Category")
    homeCatRef.on('value',(homeCatSnap) =>
    {
      //dispatch(setHomeFoodCatDataList([]))

      let foodCatArr : Array<categoryDataObj> = []
      // @ts-ignore
      homeCatSnap.forEach((homeCatChildSnap) =>
      {
        foodCatArr.push(homeCatChildSnap.val())
      })
      dispatch(setHomeFoodCatDataList(foodCatArr))
      dispatch(setHomeCatLoad(false))
    })*/
  }

  function getDealsData()
  {
    const homeDealsFoodRef =
      database()
        .ref()
        .child("Home")
        .child("Deals")
    homeDealsFoodRef.on('value',(homeDealsSnap) =>
    {
      //dispatch(setHomeDealsDataList([]))

      let dealsArr : Array<dealsDataObj> = []
      // @ts-ignore
      homeDealsSnap.forEach((homeDealsChildSnap) =>
      {
        dealsArr.push(homeDealsChildSnap.val())
      })
      dispatch(setHomeDealsDataList(dealsArr))
      dispatch(setHomeDealsLoad(false))
    })
  }

  function getTrendFoodData()
  {
    const homeTrendFoodRef =
      database()
        .ref()
        .child("Home")
        .child("TrendFood")
    homeTrendFoodRef.on('value',(homeTrendFoodSnap) =>
    {
      let trendFoodArr : Array<homeFoodObj> = []
      // @ts-ignore
      homeTrendFoodSnap.forEach((homeTrendFoodChildSnap) =>
      {
        trendFoodArr.push(homeTrendFoodChildSnap.val())
      })
      dispatch(setHomeTrendFoodDataList(trendFoodArr))
      dispatch(setHomeTrendLoad(false))
    })
  }

  function getNewFoodData()
  {
    const homeNewFoodRef =
      database()
        .ref()
        .child("Home")
        .child("NewFood")
    homeNewFoodRef.on('value',(homeNewFoodSnap) =>
    {
      //dispatch(setHomeNewFoodDataList([]))
      //console.log("DATA: " + JSON.stringify(homeNewFoodSnap.));
      let newFoodArr : Array<homeFoodObj> = []
      // @ts-ignore
      homeNewFoodSnap.forEach((homeNewFoodChildSnap) =>
      {
        newFoodArr.push(homeNewFoodChildSnap.val())
      })
      dispatch(setHomeNewFoodDataList(newFoodArr.reverse()))
      dispatch(setHomeNewFoodLoad(false))
    })
  }

  function getHomeFoodVideo()
  {
    const homeVideoFoodRef =
      database()
        .ref()
        .child("Post")
    homeVideoFoodRef.on('value',(homeVideoFoodSnap) =>
    {
      let videoArr : Array<videoObj> = []
      // @ts-ignore
      homeVideoFoodSnap.forEach((homeVideoFoodChildSnap) =>
      {
        videoArr.push(homeVideoFoodChildSnap.val())
      })
      dispatch(setHomeVideoDataList(videoArr))
      //dispatch(setHomeNewFoodLoad(false))
    })
  }

  function homeCheckInternet()
  {
    NetInfo.addEventListener(networkState =>
    {
      dispatch(setCheckHomeInternet(networkState.isConnected))
      if(networkState.isConnected)
      {
        getHomeList()
        getHomeSliderData()
        getHomeCatData()
        getHomeFoodVideo()
        getTopResData()
        getDealsData()
        getTrendFoodData()
        getNewFoodData()
      }
    });
  }

  useEffect(() =>
  {
    homeCheckInternet()
    getHomeList()
    getHomeSliderData()
    getHomeFoodVideo()
    getHomeCatData()
    getTopResData()
    getDealsData()
    getTrendFoodData()
    getNewFoodData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <HomeView />
  )
}

export default HomeController ;
